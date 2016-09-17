import React, { Component } from 'react';
import { axisBottom as d3_axisBottom, axisLeft as d3_axisLeft } from 'd3-axis';
import { max as d3_max } from 'd3-array';
import { getScaleBand, getScaleLinear } from '../../services/axis';

/**
 * Creating axis
 */
import './Axis.less';

export class Axis extends Component {
    componentDidMount() {
        const { $$data, $$rootGroup, $$height, $$width } = this.props;
        const title = $$data[0];
        const internalData = $$data.filter((item, index) => index !== 0);

        const x = getScaleBand($$width);
        const y = getScaleLinear($$height);

        x.domain(internalData.map(item => item[0]));
        y.domain([0, d3_max(internalData, item => item[1])]);

        $$rootGroup.append('g')
            .attr('class', 'axis axis__x')
            .attr('transform', `translate(0, ${$$height})`)
            .call(d3_axisBottom(x));

        $$rootGroup.append('g')
            .attr('class', 'axis axis__y')
            .call(d3_axisLeft(y).ticks(10))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .attr('text-anchor', 'end')
            .text(title[1]);
    }

    render() {
        return null;
    }
}
