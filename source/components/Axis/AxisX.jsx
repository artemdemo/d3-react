import React, { Component } from 'react';
import { axisBottom as d3_axisBottom } from 'd3-axis';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { getScaleBand, getScaleLinear, getScaleTime } from '../../services/axis';

import './Axis.less';

export class AxisX extends Component {
    componentDidMount() {
        const { $$data } = this.props;
        this.internalData = $$data.filter((item, index) => index !== 0);

        this.createXAxis(this.props, this.internalData);
    }

    componentWillReceiveProps(nextProps) {
        this.createXAxis(nextProps);
    }

    /**
     * Create or update X axis
     * @param props
     * @param data
     */
    createXAxis(props, data = this.internalData) {
        const { $$width, scale = 'band', timeFormat = '%Y' } = props;
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

        d3_select(this.xGroup)
            .call(d3_axisBottom(x));
    }

    render() {
        const { $$height = 0, $$width = 0 } = this.props;
        const { title = '' } = this.props;

        return (
            <g ref={(el) => this.xGroup = el}
               className='chart-axis chart-axis_x'
               transform={`translate(0, ${$$height})`}>
                <text transform={`translate(${$$width / 2}, 0)`}
                      className='chart-axis__title'
                      y='20'
                      dy='0.71em'
                      textAnchor='end'>
                    {title}
                </text>
            </g>
        );
    }
}

AxisX.propTypes = {
    data: React.PropTypes.array,
    title: React.PropTypes.string,
    scale: React.PropTypes.string,
    timeFormat: React.PropTypes.string,
};
