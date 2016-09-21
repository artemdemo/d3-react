import React, { Component } from 'react';
import { axisLeft as d3_axisLeft } from 'd3-axis';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear, getScaleTime } from '../../services/axis';

/**
 * Grid Y
 *
 * @tutorial https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
 */

import './Grid.less';

export class GridY extends Component {
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
        const {
            $$width,
            $$height,
            scale = 'band',
            timeFormat = '%Y',
            ticks = 10,
            maxDomain = d3_max(data, item => item[1])
        } = props;
        let y;

        switch (scale) {
            case 'linear':
                y = getScaleLinear($$height);
                y.domain([0, maxDomain]);
                break;
            case 'time':
                const parseTime = d3_timeParse(timeFormat);
                const dataParsed = data.map(item => {
                    return [
                        parseTime(item[0]),
                        item[1],
                    ];
                });
                y = getScaleTime($$height);
                y.domain(d3_extent(dataParsed, item => item[0]));
                break;
            case 'band':
            default:
                y = getScaleBand($$height);
                y.domain(data.map(item => item[0]));
        }

        d3_select(this.gridGroup)
            .call(d3_axisLeft(y)
                .ticks(ticks)
                .tickSize(-$$width)
                .tickFormat(''));
    }

    render() {
        const { className = 'chart-grid chart-grid_y' } = this.props;
        return (
            <g ref={(el) => this.gridGroup = el}
               className={className} />
        );
    }
}

GridY.propTypes = {
    data: React.PropTypes.array,
    scale: React.PropTypes.string,
    className: React.PropTypes.string,
    ticks: React.PropTypes.number,
    maxDomain: React.PropTypes.number,
    timeFormat: React.PropTypes.string,
};
