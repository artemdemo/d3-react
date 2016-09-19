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
    constructor(props) {
        super(props);

        this.state = {
            height: 0,
        }
    }

    componentDidMount() {
        const { $$data, $$height, $$width } = this.props;
        const internalData = $$data.filter((item, index) => index !== 0);

        const x = getScaleBand($$width);
        const y = getScaleLinear($$height);

        x.domain(internalData.map(item => item[0]));
        y.domain([0, d3_max(internalData, item => item[1])]);

        d3_select(this.xGroup)
            .call(d3_axisBottom(x));

        d3_select(this.yGroup)
            .call(d3_axisLeft(y).ticks(10));

        this.setState({
            height: $$height,
        });
    }

    render() {
        const { $$data } = this.props;
        const title = $$data[0];

        return (
            <g>
                <g ref={(el) => this.xGroup = el}
                   className='axis axis__x'
                   transform={`translate(0, ${this.state.height})`} />
                <g ref={(el) => this.yGroup = el}
                   className='axis axis__y'>
                    <text transform='rotate(-90)'
                          y='6'
                          dy='0.71em'>
                        {title[1]}
                    </text>
                </g>
            </g>
        );
    }
}
