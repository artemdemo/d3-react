import React from 'react';
import PropTypes from 'prop-types';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { linefyName } from '../../services/utils';
import { getScaleBand, getScaleLinear, getClassesScale } from '../../services/scales';

/**
 * Grouped bars chart
 */

const DEFAULT_BASE_CLASS = 'bars-chart';

class GroupedBars extends React.Component {
    componentDidMount() {
        const { $$data, data, $$width, className = DEFAULT_BASE_CLASS } = this.props;
        const selectedData = data || $$data;

        this.barTitles = selectedData[0];
        this.barTitles = this.barTitles.slice(1);

        this.rowTitles = [];

        this.internalData = selectedData.slice(1)
            .map((columns) => {
                const result = [];
                const rowTitle = columns[0];
                this.rowTitles.push(rowTitle);
                columns.slice(1).forEach((value, index) => result.push({
                    name: this.barTitles[index],
                    value,
                }));
                return {
                    rowTitle,
                    data: result,
                };
            });

        const groupClassesScale =
            getClassesScale(this.barTitles.map(item => `${className}__bar_${linefyName(item)}`));

        const { x, yGroups, yGroupItems } = this.createAxisScale(this.props, this.internalData);

        d3_select(this.barsGroup)
            .selectAll(`.${className}-group`)
            .data(this.internalData)
            .enter().append('g')
            .attr('class', `${className}-group`)
            .attr('transform', d => `translate(0, ${yGroups(d.rowTitle)})`)

            .selectAll(`.${className}__bar`)
            .data(group => group.data)
            .enter().append('rect')
            .attr('class', d => `${className}__bar ${groupClassesScale(d.name)}`)
            .attr('y', d => yGroupItems(d.name))
            .attr('height', yGroupItems.bandwidth())
            .attr('width', d => $$width - x(d.value));
    }

    componentWillReceiveProps(nextProps) {
        const { $$width, className = DEFAULT_BASE_CLASS } = nextProps;
        const { x, yGroups, yGroupItems } = this.createAxisScale(this.props, this.internalData);

        d3_select(this.columnsGroup)
            .selectAll(`.${className}-group`)
            .data(this.internalData)
            .attr('transform', d => `translate(0, ${yGroups(d.rowTitle)})`)

            .selectAll(`.${className}__bar`)
            .data(group => group.data)
            .attr('y', d => yGroupItems(d.name))
            .attr('height', yGroupItems.bandwidth())
            .attr('width', d => $$width - x(d.value));
    }

    createAxisScale(props, data = this.internalData) {
        const { $$height, $$width } = props;

        const yGroups = getScaleBand($$height);
        yGroups.domain(this.rowTitles);

        const yGroupItems = getScaleBand(yGroups.bandwidth(), {innerPadding: 0});
        yGroupItems.domain(this.barTitles);

        const x = getScaleLinear($$width);
        x.domain([0, d3_max(data, row => d3_max(row.data, item => item.value))]);

        return { x, yGroups, yGroupItems };
    }

    render() {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g className={className}
               ref={(el) => this.barsGroup = el} />
        );
    }
}

GroupedBars.propTypes = {
    data: PropTypes.array,
    className: PropTypes.string,
    $$width: PropTypes.number,
    $$height: PropTypes.number,
};

export default GroupedBars;
