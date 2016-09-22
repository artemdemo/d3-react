import React, { Component } from 'react';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear, getClassesScale } from '../../services/scales';


/**
 * Grouped columns chart
 *
 * @tutorial http://bl.ocks.org/mbostock/3885304
 *
 * Grouped columns
 * @tutorial https://bl.ocks.org/mbostock/3887051
 */

import './Columns.less';

export class GroupedColumns extends Component {
    componentDidMount() {
        const { $$data, $$height } = this.props;
        this.columnTitles = $$data.shift();
        this.columnTitles.shift();

        this.rowTitles = [];

        this.internalData = $$data
            .map(columns => {
                const result = [];
                const rowTitle = columns.shift();
                this.rowTitles.push(rowTitle);
                columns.forEach((value, index) => result.push({
                    name: this.columnTitles[index],
                    value,
                }));
                return {
                    rowTitle,
                    data: result,
                };
            });

        this.groupClassesScale = getClassesScale('column', this.columnTitles);

        const { xGroups, xGroupItems, y } = this.createAxisScale(this.props, this.internalData);

        d3_select(this.columsGroup)
            .selectAll('.columns-group')
            .data(this.internalData)
            .enter().append('g')
            .attr('class', 'columns-group')
            .attr('transform', d => `translate(${xGroups(d.rowTitle)}, 0)`)

            .selectAll('.column')
            .data(group => group.data)
            .enter().append('rect')
            .attr('class', d => {
                return `column ${this.groupClassesScale(d.name)}`
            })
            .attr('x', d => xGroupItems(d.name))
            .attr('y', d => y(d.value))
            .attr('width', xGroupItems.bandwidth())
            .attr('height', d => $$height - y(d.value));
    }

    componentWillReceiveProps(nextProps) {
        const { $$height } = nextProps;
        const { xGroups, xGroupItems, y } = this.createAxisScale(nextProps);

        d3_select(this.columsGroup)
            .selectAll('.columns-group')
            .data(this.internalData)
            .attr('transform', d => `translate(${xGroups(d.rowTitle)}, 0)`)

            .selectAll('.column')
            .data(group => group.data)
            .attr('x', d => xGroupItems(d.name))
            .attr('y', d => y(d.value))
            .attr('width', xGroupItems.bandwidth())
            .attr('height', d => $$height - y(d.value));

    }

    createAxisScale(props, data = this.internalData) {
        const { $$height, $$width } = props;

        const xGroups = getScaleBand($$width);
        xGroups.domain(this.rowTitles);

        const xGroupItems = getScaleBand(xGroups.bandwidth(), {innerPadding: 0.05});
        xGroupItems.domain(this.columnTitles);

        const y = getScaleLinear($$height);
        y.domain([0, d3_max(data, row => d3_max(row.data, item => item.value))]);

        return { xGroups, xGroupItems, y };
    }

    render() {
        return (
            <g ref={(el) => this.columsGroup = el} />
        );
    }
}

GroupedColumns.propTypes = {
    data: React.PropTypes.array,
    $$height: React.PropTypes.number,
    $$width: React.PropTypes.number,
};
