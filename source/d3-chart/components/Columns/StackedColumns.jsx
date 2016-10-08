import React, { Component } from 'react';
import { stack as d3_stack } from 'd3-shape';
import { max as d3_max, sum as d3_sum } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { linefyName } from '../../services/utils';
import { getScaleBand, getScaleLinear, getClassesScale } from '../../services/scales';

/**
 * Columns chart
 *
 * @tutorial http://bl.ocks.org/mbostock/3885304
 *
 * Grouped columns
 * @tutorial https://bl.ocks.org/mbostock/3887051
 *
 * Stacked columns
 * @tutorial http://bl.ocks.org/mbostock/3886208
 */

const DEFAULT_BASE_CLASS = 'columns-chart';

export class StackedColumns extends Component {
    componentDidMount() {
        const { $$data, data, className = DEFAULT_BASE_CLASS } = this.props;
        const selectedData = data || $$data;

        this.columnTitles = selectedData[0];
        this.columnTitles = this.columnTitles.slice(1);

        this.rowTitles = [];

        this.internalData = selectedData.slice(1);

        const formattedData = this.internalData
            .map(columns => {
                const columnTitle = {
                    original: columns[0],
                    linified: linefyName(columns[0]),
                };
                const resultColumn = {
                    _title: columnTitle,
                };
                this.rowTitles.push(columnTitle.linified);
                columns.slice(1).forEach((column, index) => {
                    resultColumn[linefyName(this.columnTitles[index])] = column;
                });
                return resultColumn;
            });

        this.stackData = d3_stack().keys(this.columnTitles.map(title => linefyName(title)))(formattedData);

        const groupClassesScale =
            getClassesScale(this.columnTitles.map(item => `${className}-serie_${linefyName(item)}`));

        const { x, y } = this.createAxisScale(this.props, this.internalData);

        d3_select(this.columnsGroup)
            .selectAll(`.${className}-serie`)
            .data(this.stackData)
            .enter().append('g')
            .attr('class', (d) => `${className}-serie ${groupClassesScale(d.key)}`)

            .selectAll(`.${className}__column`)
            .data(d => d)
            .enter().append('rect')
            .attr('class', `${className}__column`)
            .attr('x', d => x(d.data._title.linified))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => y(d[0]) - y(d[1]));
    }

    componentWillReceiveProps(nextProps) {
        const { className = DEFAULT_BASE_CLASS } = nextProps;
        const { x, y } = this.createAxisScale(nextProps);

        d3_select(this.columnsGroup)
            .selectAll(`.${className}-serie`)
            .data(this.stackData)

            .selectAll(`.${className}__column`)
            .data(d => d)
            .attr('x', d => x(d.data._title.linified))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => y(d[0]) - y(d[1]));

    }

    createAxisScale(props, data = this.internalData) {
        const { $$height, $$width } = props;

        const x = getScaleBand($$width);
        x.domain(this.rowTitles);

        const y = getScaleLinear($$height);
        y.domain([0, d3_max(data, row => d3_sum(row.slice(1)))]);

        return { x, y };
    }

    render() {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g className={className}
               ref={(el) => this.columnsGroup = el} />
        );
    }
}

StackedColumns.propTypes = {
    data: React.PropTypes.array,
    $$height: React.PropTypes.number,
    $$width: React.PropTypes.number,
};
