import React, { Component } from 'react';
import { max as d3_max } from 'd3-array';
import { getScaleBand, getScaleLinear } from '../../services/axis';

/**
 * Columns chart
 *
 * @tutorial http://bl.ocks.org/mbostock/3885304
 */

import './Columns.less';

export class Columns extends Component {
    componentDidMount() {
        const { $$data, $$rootGroup, $$height, $$width } = this.props;

        // Use data without title row
        const internalData = $$data.filter((item, index) => index !== 0);

        const x = getScaleBand($$width);
        const y = getScaleLinear($$height);

        x.domain(internalData.map(item => item[0]));
        y.domain([0, d3_max(internalData, item => item[1])]);

        $$rootGroup.selectAll('.column')
            .data(internalData)
            .enter().append('rect')
            .attr('class', 'column')
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => $$height - y(d[1]))
            .on('mouseover', (dataItem, index, dataArray) => {

            })
            .on('mouseout', () => {});
    }

    render() {
        return null;
    }
}

Columns.propTypes = {
    data: React.PropTypes.array,
    $$rootGroup: React.PropTypes.object,
    $$height: React.PropTypes.number,
};
