import React, { Component } from 'react';
import { select as d3_select } from 'd3-selection';
import { scaleBand as d3_scaleBand, scaleLinear as d3_scaleLinear } from 'd3-scale';
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
        const svg = d3_select(this.refs.barsSVG);
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = +svg.attr('width') - margin.left - margin.right;
        const height = +svg.attr('height') - margin.top - margin.bottom;

        // Create an ordinal band scale
        const x = d3_scaleBand().rangeRound([0, width]).padding(0.1);

        // Create a quantitative linear scale
        const y = d3_scaleLinear().rangeRound([height, 0]);

        const rootGroup = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const { data } = this.props;
        const title = data.shift();

        x.domain(data.map(item => item[0]));
        y.domain([0, d3_max(data, item => item[1])]);

        rootGroup.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', `translate(0, ${height})`)
            .call(d3_axisBottom(x));

        rootGroup.append('g')
            .attr('class', 'axis axis--y')
            .call(d3_axisLeft(y).ticks(10))
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '0.71em')
            .attr('fill', '#000')
            .attr('text-anchor', 'end')
            .text(title[1]);

        rootGroup.selectAll('.bar')
            .data(data)
            .enter().append('rect')
            .attr('class', 'bar')
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => height - y(d[1]))
            .on('mouseover', (dataItem, index, dataArray) => {
                console.log(args);
            })
            .on('mouseout', () => {});
    }

    render() {
        return (
            <div className='bars-chart'>
                <svg ref='barsSVG' width='960' height='500' />
            </div>
        )
    }
}

Bars.propTypes = {
    data: React.PropTypes.array.isRequired,
};
