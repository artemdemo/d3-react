import React, { Component } from 'react';
import { line as d3_line } from 'd3-shape';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { getScaleLinear, getScaleTime } from '../../services/axis';

/**
 * Line chart
 *
 * @tutorial https://bl.ocks.org/mbostock/02d893e3486c70c4475f
 * @tutorial https://bl.ocks.org/mbostock/3884955
 */

import './Line.less';

export class LineTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pathFunc: null,
        }
    }

    componentDidMount() {
        const { $$data } = this.props;
        this.internalData = $$data.filter((item, index) => index !== 0);
        const { x, y } = this.createAxisScale(this.props, this.internalData);

        this.setState({
            pathFunc: d3_line()
                .x(d => x(d[0]))
                .y(d => y(d[1])),
        });
    }

    createAxisScale(props, data = this.internalData) {
        const { $$height, $$width, format } = props;

        const x = getScaleTime($$width);
        const y = getScaleLinear($$height);

        const parseTime = d3_timeParse(format);
        const dataParsed = data.map(item => {
            return [
                parseTime(item[0]),
                item[1]
            ]
        });

        x.domain(d3_extent(dataParsed, item => item[0]));
        y.domain([0, d3_max(data, item => item[1])]);

        return { x, y };
    }

    render() {
        const { className = 'line-chart' } = this.props;

        if (!this.state.pathFunc) {
            return null;
        }

        return (
            <path className={className}
                  d={this.state.pathFunc(this.internalData)} />
        );
    }
}

LineTime.propTypes = {
    format: React.PropTypes.string.isRequired,
};