import React, { Component } from 'react';
import { axisBottom as d3_axisBottom, axisLeft as d3_axisLeft } from 'd3-axis';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear } from '../../services/axis';

/**
 * Creating axis
 */
import './Axis.less';

export class Axis extends Component {
    componentDidMount() {
        const { $$data } = this.props;

        this.internalData = $$data.filter((item, index) => index !== 0);

        this.createXAxis(this.props, this.internalData);
        this.createYAxis(this.props, this.internalData);
    }

    componentWillReceiveProps(nextProps) {
        this.createXAxis(nextProps);
        this.createYAxis(nextProps);
    }

    /**
     * Create or update X axis
     * @param props
     * @param data
     */
    createXAxis(props, data = this.internalData) {
        const { $$width, xScale = 'band' } = props;
        let x;

        switch (xScale) {
            case 'linear':
                x = getScaleLinear($$width);
                x.domain([d3_max(data, item => item[1]), 0]);
                break;
            case 'band':
            default:
                x = getScaleBand($$width);
                x.domain(data.map(item => item[0]));
        }

        d3_select(this.xGroup)
            .call(d3_axisBottom(x));
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
        const { $$height = 0, $$width = 0 } = this.props;
        const { xTitle = '', yTitle = '' } = this.props;

        return (
            <g>
                <g ref={(el) => this.xGroup = el}
                   className='axis axis_x'
                   transform={`translate(0, ${$$height})`}>
                    <text transform={`translate(${$$width / 2}, 0)`}
                          className='axis__title'
                          y='20'
                          dy='0.71em'
                          fill='#000'
                          textAnchor='end'>
                        {xTitle}
                    </text>
                </g>
                <g ref={(el) => this.yGroup = el}
                   className='axis axis_y'>
                    <text transform='rotate(-90)'
                          className='axis__title'
                          y='6'
                          dy='0.71em'
                          fill='#000'
                          textAnchor='end'>
                        {yTitle}
                    </text>
                </g>
            </g>
        );
    }
}

Axis.propTypes = {
    data: React.PropTypes.array,
    xTitle: React.PropTypes.string,
    yTitle: React.PropTypes.string,
    xScale: React.PropTypes.string,
    yScale: React.PropTypes.string,
    $$data: React.PropTypes.array,
    $$width: React.PropTypes.number,
    $$height: React.PropTypes.number,
};
