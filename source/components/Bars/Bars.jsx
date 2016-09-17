import React, { Component } from 'react';
import { axisBottom as d3_axisBottom, axisLeft as d3_axisLeft } from 'd3-axis';
import { max as d3_max } from 'd3-array';

/**
 * Bar chart
 *
 * @tutorial http://bl.ocks.org/mbostock/3885304
 */

import './Bars.less';

export class Bars extends Component {
    componentDidMount() {
        const { data, $$x, $$y, $$rootGroup, $$width, $$height } = this.props;
        const title = data.shift();

        $$x.domain(data.map(item => item[0]));
        $$y.domain([0, d3_max(data, item => item[1])]);

        $$rootGroup.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(0, ${$$height})`)
            .call(d3_axisBottom($$x));

        $$rootGroup.append('g')
            .attr('class', 'axis axis--y')
            .call(d3_axisLeft($$y).ticks(10))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .attr('text-anchor', 'end')
            .text(title[1]);

        $$rootGroup.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => $$x(d[0]))
            .attr('y', d => $$y(d[1]))
            .attr('width', $$x.bandwidth())
            .attr('height', d => $$height - $$y(d[1]))
            .on('mouseover', (dataItem, index, dataArray) => {

            })
            .on('mouseout', () => {});
    }

    render() {
        return null;
    }
}

Bars.propTypes = {
    data: React.PropTypes.array,
    $$x: React.PropTypes.func,
    $$y: React.PropTypes.func,
    $$rootGroup: React.PropTypes.object,
    $$width: React.PropTypes.number,
    $$height: React.PropTypes.number,
};
