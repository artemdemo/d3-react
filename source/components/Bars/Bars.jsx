import React from 'react';
import PropTypes from 'prop-types';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear } from '../../services/scales';

/**
 * Bar chart
 *
 * @tutorial http://bl.ocks.org/mbostock/3885304
 */

const DEFAULT_BASE_CLASS = 'bars-chart';

class Bars extends React.Component {
    componentDidMount() {
        const { $$data, $$width, className = DEFAULT_BASE_CLASS } = this.props;

        // Use data without title row
        this.internalData = $$data.filter((item, index) => index !== 0);

        const { x, y } = this.createAxisScale(this.props, this.internalData);

        d3_select(this.barsGroup).selectAll(`.${className}__bar`)
            .data(this.internalData)
            .enter().append('rect')
            .attr('class', `${className}__bar`)
            // .attr('x', d => x(d[1])) // this will put align bars on the right
            .attr('y', d => y(d[0]))
            .attr('height', y.bandwidth())
            .attr('width', d => $$width - x(d[1]));
    }

    componentWillReceiveProps(nextProps) {
        const { $$width, className = DEFAULT_BASE_CLASS } = nextProps;
        const { x, y } = this.createAxisScale(nextProps);

        d3_select(this.barsGroup).selectAll(`.${className}__bar`)
            .data(this.internalData)
            .attr('y', d => y(d[0]))
            .attr('height', y.bandwidth())
            .attr('width', d => $$width - x(d[1]));
    }

    createAxisScale(props, data = this.internalData) {
        const { $$height, $$width } = props;
        const x = getScaleLinear($$width);
        const y = getScaleBand($$height);

        x.domain([0, d3_max(data, item => item[1])]);
        y.domain(data.map(item => item[0]));

        return { x, y };
    }

    render() {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g className={className}
               ref={(el) => this.barsGroup = el} />
        );
    }
}

Bars.propTypes = {
    data: PropTypes.array,
    className: PropTypes.string,
    $$width: PropTypes.number,
    $$height: PropTypes.number,
};

export default Bars;
