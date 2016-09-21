import React, { Component } from 'react';
import { line as d3_line, area as d3_area, curveStep as d3_curveStep } from 'd3-shape';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { getScaleLinear, getScaleTime } from '../../services/axis';

/**
 * Line chart
 *
 * @tutorial https://bl.ocks.org/mbostock/02d893e3486c70c4475f
 * @tutorial https://bl.ocks.org/mbostock/3884955
 *
 * Steps line chart
 * @tutorial http://bl.ocks.org/shimizu/f7ef798894427a99efe5e173e003260d
 *
 * Different curve lines
 * @tutorial https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
 *
 * Line with area
 * @tutorial https://bl.ocks.org/d3noob/119a138ef9bd1d8f0a8d57ea72355252
 */

import './Line.less';

export class LineTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pathFunc: null,
            areaFunc: null,
        };
    }

    componentDidMount() {
        const { $$data, data } = this.props;
        const selectedData = data || $$data;
        this.internalData = selectedData.filter((item, index) => index !== 0);

        this.updatePaths(this.props, this.internalData);
    }

    componentWillReceiveProps(nextProps) {
        this.updatePaths(nextProps, this.internalData);
    }

    updatePaths(props, data = this.internalData) {
        const { $$height, $$width, curve, area } = props;

        const x = getScaleTime($$width);
        const y = getScaleLinear($$height);

        x.domain(d3_extent(data, item => item[0]));
        y.domain([0, d3_max(data, item => item[1])]);

        let pathFunc = d3_line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));

        let areaFunc = null;

        if (area === true) {
            areaFunc = d3_area()
                .x(d => x(d[0]))
                .y0($$height)
                .y1(d => y(d[1]));
        }

        switch (curve) {
            case 'step':
                pathFunc.curve(d3_curveStep);
                if (areaFunc) {
                    areaFunc.curve(d3_curveStep);
                }
        }

        this.setState({
            pathFunc,
            areaFunc
        });
    }

    renderArea() {
        const { className = 'line-chart', area = false } = this.props;
        if (area === true) {
            return (
                <path className={`${className}__area`}
                      d={this.state.areaFunc(this.internalData)} />
            );
        }
        return null;
    }

    render() {
        const { className = 'line-chart' } = this.props;

        if (!this.state.pathFunc) {
            return null;
        }

        return (
            <g className={className}>
                {this.renderArea()}
                <path className={`${className}__line-path`}
                      d={this.state.pathFunc(this.internalData)} />
            </g>
        );
    }
}

LineTime.propTypes = {
    data: React.PropTypes.array,
    className: React.PropTypes.string,
    area: React.PropTypes.bool,
};
