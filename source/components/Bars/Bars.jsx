import React, { Component } from 'react';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear } from '../../services/axis';

/**
 * Bar chart
 *
 * @tutorial http://bl.ocks.org/mbostock/3885304
 */

import './Bars.less';

export class Bars extends Component {
    componentDidMount() {
        const { $$data, $$height, $$width } = this.props;

        // Use data without title row
        const internalData = $$data.filter((item, index) => index !== 0);

        const x = getScaleLinear($$width);
        const y = getScaleBand($$height);

        x.domain([0, d3_max(internalData, item => item[1])]);
        y.domain(internalData.map(item => item[0]));

        d3_select(this.barsGroup).selectAll('.bar')
            .data(internalData)
            .enter().append('rect')
            .attr('class', 'bar')
            // .attr('x', d => x(d[1])) // this will put align bars on the right
            .attr('y', d => y(d[0]))
            .attr('height', y.bandwidth())
            .attr('width', d => $$width - x(d[1]))
            .on('mouseover', (dataItem, index, dataArray) => {

            })
            .on('mouseout', () => {});
    }

    render() {
        return (
            <g ref={(el) => this.barsGroup = el} />
        );
    }
}

Bars.propTypes = {
    data: React.PropTypes.array,
    $$width: React.PropTypes.number,
    $$height: React.PropTypes.number,
};
