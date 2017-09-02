import React from 'react';
import PropTypes from 'prop-types';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { linefyName } from '../../services/utils';
import { getScaleBand, getScaleLinear, getClassesScale } from '../../services/scales';

/**
 * Grouped columns chart
 *
 * @tutorial http://bl.ocks.org/mbostock/3885304
 *
 * Grouped columns
 * @tutorial https://bl.ocks.org/mbostock/3887051
 */

const DEFAULT_BASE_CLASS = 'columns-chart';

class GroupedColumns extends React.Component {
    componentDidMount() {
        const { $$data, data, $$height, className = DEFAULT_BASE_CLASS } = this.props;
        const selectedData = data || $$data;

        this.columnTitles = selectedData[0];
        this.columnTitles = this.columnTitles.slice(1);

        this.rowTitles = [];

        this.internalData = selectedData.slice(1)
            .map(columns => {
                const result = [];
                const rowTitle = columns[0];
                this.rowTitles.push(rowTitle);
                columns.slice(1).forEach((value, index) => result.push({
                    name: this.columnTitles[index],
                    value,
                }));
                return {
                    rowTitle,
                    data: result,
                };
            });

        const groupClassesScale =
            getClassesScale(this.columnTitles.map(item => `${className}__column_${linefyName(item)}`));

        const { xGroups, xGroupItems, y } = this.createAxisScale(this.props, this.internalData);

        d3_select(this.columnsGroup)
            .selectAll(`.${className}-group`)
            .data(this.internalData)
            .enter().append('g')
            .attr('class', `${className}-group`)
            .attr('transform', d => `translate(${xGroups(d.rowTitle)}, 0)`)

            .selectAll(`.${className}__column`)
            .data(group => group.data)
            .enter().append('rect')
            .attr('class', d => `${className}__column ${groupClassesScale(d.name)}`)
            .attr('x', d => xGroupItems(d.name))
            .attr('y', d => y(d.value))
            .attr('width', xGroupItems.bandwidth())
            .attr('height', d => $$height - y(d.value));
    }

    componentWillReceiveProps(nextProps) {
        const { $$height, className = DEFAULT_BASE_CLASS } = nextProps;
        const { xGroups, xGroupItems, y } = this.createAxisScale(nextProps);

        d3_select(this.columnsGroup)
            .selectAll(`.${className}-group`)
            .data(this.internalData)
            .attr('transform', d => `translate(${xGroups(d.rowTitle)}, 0)`)

            .selectAll(`.${className}__column`)
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

        const xGroupItems = getScaleBand(xGroups.bandwidth(), {innerPadding: 0});
        xGroupItems.domain(this.columnTitles);

        const y = getScaleLinear($$height);
        y.domain([0, d3_max(data, row => d3_max(row.data, item => item.value))]);

        return { xGroups, xGroupItems, y };
    }

    render() {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g className={className}
               ref={(el) => this.columnsGroup = el} />
        );
    }
}

GroupedColumns.propTypes = {
    data: PropTypes.array,
    $$height: PropTypes.number,
    $$width: PropTypes.number,
};

export default GroupedColumns;
