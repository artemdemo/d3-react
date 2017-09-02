import React from 'react';
import PropTypes from 'prop-types';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { getScaleLinear, getScaleTime } from '../../services/scales';

/**
 * Dots chart
 *
 * @tutorial http://bl.ocks.org/rajvansia/ce6903fad978d20773c41ee34bf6735c
 */

const DEFAULT_BASE_CLASS = 'dots-chart';

class Dots extends React.Component {
    componentDidMount() {
        this.updateChart(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateChart(nextProps);
    }

    updateChart(props) {
        const { $$data, data, timeFormat, className = DEFAULT_BASE_CLASS, dotRadius = 5 } = props;
        const selectedData = data || $$data;
        const parseTime = d3_timeParse(timeFormat);
        const convertedData = selectedData.slice(1).map(row => {
            return [
                parseTime(row[0]),
                row[1],
            ];
        });
        const { x, y } = this.createAxisScale(props, convertedData);

        this.dotsGroup.innerHTML = '';

        d3_select(this.dotsGroup)
            .selectAll(`${className}__dot`)
            .data(convertedData)
            .enter().append('circle')
            .attr('class', `${className}__dot`)
            .attr('r', dotRadius)
            .attr('cx', d => x(d[0]))
            .attr('cy', d => y(d[1]));
    }

    createAxisScale(props, data) {
        const { $$height, $$width } = props;
        const x = getScaleTime($$width);
        const y = getScaleLinear($$height);

        x.domain(d3_extent(data, item => item[0]));
        y.domain([0, d3_max(data, item => item[1])]);

        return { x, y };
    }

    render() {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g ref={el => this.dotsGroup = el}
               className={className}
               clipPath='url(#clip)' />
        );
    }
}

Dots.propTypes = {
    data: PropTypes.array,
    timeFormat: PropTypes.string,
    className: PropTypes.string,
    dotRadius: PropTypes.number,
};

export default Dots;
