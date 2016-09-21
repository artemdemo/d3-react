import React, { Component } from 'react';
import { line as d3_line, curveStep as d3_curveStep } from 'd3-shape';
import { max as d3_max, extent as d3_extent } from 'd3-array';
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
        };
    }

    componentDidMount() {
        const { $$data } = this.props;
        this.internalData = $$data.filter((item, index) => index !== 0);

        this.setState({
            pathFunc: this.createLinePath(this.props, this.internalData),
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            pathFunc: this.createLinePath(nextProps, this.internalData),
        });
    }

    createLinePath(props, data = this.internalData) {
        const { $$height, $$width, curve } = props;

        const x = getScaleTime($$width);
        const y = getScaleLinear($$height);

        x.domain(d3_extent(data, item => item[0]));
        y.domain([0, d3_max(data, item => item[1])]);

        let linePath = d3_line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));

        switch (curve) {
            case 'step':
                linePath.curve(d3_curveStep);
        }

        return linePath;
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
