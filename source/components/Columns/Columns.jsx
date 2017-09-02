import React from 'react';
import PropTypes from 'prop-types';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear } from '../../services/scales';

/**
 * Columns chart
 *
 * @tutorial http://bl.ocks.org/mbostock/3885304
 */

const DEFAULT_BASE_CLASS = 'columns-chart';

class Columns extends React.Component {
    componentDidMount() {
        const { $$data, $$height, className = DEFAULT_BASE_CLASS } = this.props;

        // Use data without title row
        this.internalData = $$data.filter((item, index) => index !== 0);

        const { x, y } = this.createAxisScale(this.props, this.internalData);

        d3_select(this.columnsGroup).selectAll(`.${className}__column`)
            .data(this.internalData)
            .enter().append('rect')
            .attr('class', `${className}__column`)
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => $$height - y(d[1]));
    }

    componentWillReceiveProps(nextProps) {
        const { $$height, className = DEFAULT_BASE_CLASS } = nextProps;
        const { x, y } = this.createAxisScale(nextProps);

        d3_select(this.columnsGroup).selectAll(`.${className}__column`)
            .data(this.internalData)
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', x.bandwidth())
            .attr('height', d => $$height - y(d[1]));
    }

    createAxisScale(props, data = this.internalData) {
        const { $$height, $$width } = props;

        const x = getScaleBand($$width);
        x.domain(data.map(item => item[0]));

        const y = getScaleLinear($$height);
        y.domain([0, d3_max(data, item => item[1])]);

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

Columns.propTypes = {
    data: PropTypes.array,
    $$height: PropTypes.number,
    $$width: PropTypes.number,
};

export default Columns;
