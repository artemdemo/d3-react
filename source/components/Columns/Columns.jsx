import React, { Component } from 'react';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear } from '../../services/axis';
import { ToolTip } from '../ToolTip/ToolTip';

/**
 * Columns chart
 *
 * @tutorial http://bl.ocks.org/mbostock/3885304
 */

import './Columns.less';

export class Columns extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltipParent: null,
        };
    }

    componentDidMount() {
        const { $$data, $$height, $$width } = this.props;

        // Use data without title row
        this.internalData = $$data.filter((item, index) => index !== 0);

        const x = getScaleBand($$width);
        const y = getScaleLinear($$height);

        x.domain(this.internalData.map(item => item[0]));
        y.domain([0, d3_max(this.internalData, item => item[1])]);

        d3_select(this.columsGroup).selectAll('.column')
            .data(this.internalData)
            .enter().append('rect')
            .attr('class', 'column')
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => $$height - y(d[1]))
            .on('mouseover', (dataItem, index, dataArray) => {
                this.setState({
                    tooltipParent: dataArray[index],
                });
            })
            .on('mouseout', () => {
                this.setState({
                    tooltipParent: null,
                });
            });
    }

    componentWillReceiveProps(nextProps) {
        const { $$height, $$width } = nextProps;

        const x = getScaleBand($$width);
        const y = getScaleLinear($$height);

        x.domain(this.internalData.map(item => item[0]));
        y.domain([0, d3_max(this.internalData, item => item[1])]);

        d3_select(this.columsGroup).selectAll('.column')
            .data(this.internalData)
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => $$height - y(d[1]));
    }

    render() {
        return (
            <g ref={(el) => this.columsGroup = el} />
        );
    }
}

Columns.propTypes = {
    data: React.PropTypes.array,
    $$height: React.PropTypes.number,
    $$width: React.PropTypes.number,
};
