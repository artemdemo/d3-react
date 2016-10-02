import React, { Component } from 'react';
import { axisBottom as d3_axisBottom } from 'd3-axis';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear, getScaleTime } from '../../services/scales';

/**
 * Grid X
 *
 * @tutorial https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
 */

const DEFAULT_BASE_CLASS = 'chart-grid';

export class GridX extends Component {
    componentDidMount() {
        const { $$data, data } = this.props;
        const selectedData = data || $$data;
        this.internalData = selectedData.filter((item, index) => index !== 0);

        this.createGrid(this.props, this.internalData);
    }

    componentWillReceiveProps(nextProps) {
        this.createGrid(nextProps, this.internalData);
    }

    createGrid(props, data = this.internalData) {
        const { $$width, $$height, scale = 'band', timeFormat = '%Y', ticks = 10 } = props;
        let x;

        switch (scale) {
            case 'linear':
                x = getScaleLinear($$width);
                x.domain([d3_max(data, item => item[1]), 0]);
                break;
            case 'time':
                const parseTime = d3_timeParse(timeFormat);
                const dataParsed = data.map(item => {
                    return [
                        parseTime(item[0]),
                        item[1],
                    ];
                });
                x = getScaleTime($$width);
                x.domain(d3_extent(dataParsed, item => item[0]));
                break;
            case 'band':
            default:
                x = getScaleBand($$width);
                x.domain(data.map(item => item[0]));
        }

        d3_select(this.gridGroup)
            .call(d3_axisBottom(x)
                .ticks(ticks)
                .tickSize(-$$height)
                .tickFormat(''));
    }

    render() {
        const { $$height, className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g ref={(el) => this.gridGroup = el}
               transform={`translate(0, ${$$height})`}
               className={className} />
        );
    }
}

GridX.propTypes = {
    data: React.PropTypes.array,
    scale: React.PropTypes.string,
    className: React.PropTypes.string,
    ticks: React.PropTypes.number,
    timeFormat: React.PropTypes.string,
};
