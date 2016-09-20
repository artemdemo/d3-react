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
        const { $$data, $$height, $$width } = this.props;
        const { xScale = 'band', yScale = 'linear' } = this.props;
        let x;
        let y;

        this.internalData = $$data.filter((item, index) => index !== 0);

        switch (xScale) {
            case 'linear':
                x = getScaleLinear($$width);
                x.domain([d3_max(this.internalData, item => item[1]), 0]);
                break;
            case 'band':
            default:
                x = getScaleBand($$width);
                x.domain(this.internalData.map(item => item[0]));
        }

        switch (yScale) {
            case 'band':
                y = getScaleBand($$height);
                y.domain(this.internalData.map(item => item[0]));
                break;
            case 'linear':
            default:
                y = getScaleLinear($$height);
                y.domain([0, d3_max(this.internalData, item => item[1])]);
        }

        d3_select(this.xGroup)
            .call(d3_axisBottom(x));

        d3_select(this.yGroup)
            .call(d3_axisLeft(y).ticks(10));
    }

    componentWillReceiveProps(nextProps) {
        const { $$width } = nextProps;
        const { xScale = 'band' } = this.props;
        let x;

        switch (xScale) {
            case 'linear':
                x = getScaleLinear($$width);
                x.domain([d3_max(this.internalData, item => item[1]), 0]);
                break;
            case 'band':
            default:
                x = getScaleBand($$width);
                x.domain(this.internalData.map(item => item[0]));
        }

        d3_select(this.xGroup)
            .call(d3_axisBottom(x));
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
