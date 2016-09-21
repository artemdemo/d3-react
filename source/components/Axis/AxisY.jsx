import React, { Component } from 'react';
import { axisLeft as d3_axisLeft } from 'd3-axis';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear } from '../../services/axis';

import './Axis.less';

export class AxisY extends Component {
    componentDidMount() {
        const { $$data } = this.props;
        this.internalData = $$data.filter((item, index) => index !== 0);

        this.createYAxis(this.props, this.internalData);
    }

    componentWillReceiveProps(nextProps) {
        this.createYAxis(nextProps);
    }

    /**
     * Create or update Y axis
     * @param props
     * @param data
     */
    createYAxis(props, data = this.internalData) {
        const { $$height, yScale = 'linear' } = props;
        let y;

        switch (yScale) {
            case 'band':
                y = getScaleBand($$height);
                y.domain(data.map(item => item[0]));
                break;
            case 'linear':
            default:
                y = getScaleLinear($$height);
                y.domain([0, d3_max(data, item => item[1])]);
        }

        d3_select(this.yGroup)
            .call(d3_axisLeft(y).ticks(10));
    }

    render() {
        const { title = '' } = this.props;

        return (
            <g ref={(el) => this.yGroup = el}
               className='chart-axis chart-axis_y'>
                <text transform='rotate(-90)'
                      className='chart-axis__title'
                      y='6'
                      dy='0.71em'
                      textAnchor='end'>
                    {title}
                </text>
            </g>
        );
    }
}

AxisY.propTypes = {
    data: React.PropTypes.array,
    title: React.PropTypes.string,
    scale: React.PropTypes.string,
};
