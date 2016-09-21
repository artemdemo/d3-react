import React, { Component } from 'react';
import { axisBottom as d3_axisBottom } from 'd3-axis';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear, getScaleTime } from '../../services/axis';

/**
 * Grid X
 *
 * @tutorial https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
 */

import './Grid.less';

export class GridX extends Component {
    componentDidMount() {
        const { $$data } = this.props;
        this.internalData = $$data.filter((item, index) => index !== 0);

        const { $$width, $$height, scale = 'band', timeFormat = '%Y' } = this.props;
        let x;

        switch (scale) {
            case 'linear':
                x = getScaleLinear($$width);
                x.domain([d3_max(this.internalData, item => item[1]), 0]);
                break;
            case 'time':
                const parseTime = d3_timeParse(timeFormat);
                const dataParsed = this.internalData.map(item => {
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
                x.domain(this.internalData.map(item => item[0]));
        }

        d3_select(this.gridGroup)
            .call(d3_axisBottom(x)
                .ticks(5)
                .tickSize(-$$height)
                .tickFormat(''));
    }
    componentWillReceiveProps(nextProps) {}
    render() {
        const { $$height } = this.props;
        return (
            <g ref={(el) => this.gridGroup = el}
               transform={`translate(0, ${$$height})`}
               className='chart-grid chart-grid_x' />
        );
    }
}

GridX.propTypes = {
    data: React.PropTypes.array,
    scale: React.PropTypes.string,
    timeFormat: React.PropTypes.string,
};
