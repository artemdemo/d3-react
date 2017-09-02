import React, { Component } from 'react';
import { stack as d3_stack } from 'd3-shape';
import { max as d3_max, sum as d3_sum, extent as d3_extent } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { timeParse as d3_timeParse } from 'd3-time-format';
import _ from '../../libraries/lodash';
import { linefyName } from '../../services/utils';
import { getScaleBand, getScaleLinear, getClassesScale, getScaleTime } from '../../services/scales';
import { deltaShape } from '../../propTypes';

const DEFAULT_BASE_CLASS = 'columns-chart';
const scaleType = {
    BAND: 'band',
    TIME: 'time',
};

/**
 * Stacked columns chart
 *
 * http://bl.ocks.org/mbostock/3886208
 */
export default class StackedColumns extends Component {
    componentDidMount() {
        this.updateColumns(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateColumns(nextProps);
    }

    updateColumns(props) {
        const { $$width, $$height, $$data, $$dataDelta, scale, timeFormat, className = DEFAULT_BASE_CLASS } = props;
        const { dataDelta = $$dataDelta, data = $$data } = props;

        let columnTitles = data[0];
        columnTitles = columnTitles.slice(1);

        const rowTitles = [];
        const internalData = data.slice(1);
        const formattedData = internalData
            .map((columns) => {
                const columnTitle = {
                    original: columns[0],
                    linified: linefyName(String(columns[0])),
                };
                const resultColumn = {
                    _title: columnTitle,
                };
                rowTitles.push(columnTitle.linified);
                columns.slice(1).forEach((column, index) => {
                    resultColumn[linefyName(columnTitles[index])] = column;
                });
                return resultColumn;
            });

        let x;
        let columnWidth;
        switch (scale) {
            case scaleType.TIME:
                const parseTime = timeFormat ? d3_timeParse(timeFormat) : null;
                const dataParsed = internalData.map((item) => {
                    const dateObject = parseTime ? parseTime(item[0]) : item[0];
                    return [
                        dateObject,
                        item[1],
                    ];
                });

                x = getScaleTime($$width);
                x.domain(d3_extent(dataParsed, item => item[0]));
                columnWidth = dataParsed.length > 0 ? $$width / dataParsed.length : 0;
                break;
            case scaleType.BAND:
            default:
                x = getScaleBand($$width);
                x.domain(rowTitles);
                columnWidth = x.bandwidth();
        }

        const y = getScaleLinear($$height);
        const maxY = dataDelta && dataDelta.y ?
        dataDelta.y * d3_max(data, row => d3_sum(row.slice(1))) :
            d3_max(data, row => d3_sum(row.slice(1)));
        y.domain([0, maxY]);

        const stackData = d3_stack().keys(columnTitles.map(title => linefyName(title)))(formattedData);
        const groupClassesScale =
            getClassesScale(columnTitles.map(item => `${className}-serie_${linefyName(item)}`));

        this.columnsGroup.innerHTML = '';

        d3_select(this.columnsGroup)
            .selectAll(`.${className}-serie`)
            .data(stackData)
            .enter().append('g')
            .attr('class', d => `${className}-serie ${groupClassesScale(d.key)}`)

            .selectAll(`.${className}__column`)
            .data(d => d)
            .enter().append('rect')
            .attr('class', `${className}__column`)
            .attr('x', (d) => {
                switch (scale) {
                    case scaleType.TIME:
                        return x(d.data._title.original);
                    case scaleType.BAND:
                    default:
                        return x(d.data._title.linified);
                }
            })
            .attr('y', d => y(d[1]))
            .attr('width', columnWidth)
            .attr('height', d => y(d[0]) - y(d[1]));
    }

    render() {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g className={className}
               ref={el => this.columnsGroup = el} />
        );
    }
}

StackedColumns.propTypes = {
    /**
     * Main data object of the component
     * See `<Chart />`
     */
    data: React.PropTypes.array,
    /**
     * Time format of axis labels (by default, expected to be Date() object)
     */
    timeFormat: React.PropTypes.string,
    /**
     * Delta change for maximum data value.
     * Value is in percents.
     */
    dataDelta: deltaShape,
    /**
     * Component class property for CSS
     */
    className: React.PropTypes.string,
    /**
     * Axis scale. Determine how to treat components `data`
     */
    scale: React.PropTypes.oneOf(_.values(scaleType)),
};
