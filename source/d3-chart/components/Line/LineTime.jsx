import React, { Component } from 'react';
import { line as d3_line, area as d3_area, curveStep as d3_curveStep } from 'd3-shape';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { getScaleLinear, getScaleTime } from '../../services/scales';

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

const BASE_CLASS_NAME = 'line-chart';

export class LineTime extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pathFunc: null,
            areaFunc: null,
        };

        this.saltId = Math.floor(Math.random() * 10000);
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
        const {
            $$height,
            $$width,
            curve,
            area,
            maxDomain = d3_max(data, item => item[1]),
        } = props;

        const x = getScaleTime($$width);
        const y = getScaleLinear($$height);

        x.domain(d3_extent(data, item => item[0]));
        y.domain([0, maxDomain]);

        const pathFunc = d3_line()
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
            areaFunc,
        });
    }

    renderArea() {
        const { className = BASE_CLASS_NAME, area = false } = this.props;
        if (area === true) {
            return (
                <path className={`${className}__area`}
                      d={this.state.areaFunc(this.internalData)} />
            );
        }
        return null;
    }

    renderLine() {
        const { className = BASE_CLASS_NAME, line = true, glow } = this.props;
        const glowFilter = (
            <g>
                <filter id={`line-time-blur-filter-${this.saltId}`} x='-2' y='-2' width='2000' height='2000'>
                    <feGaussianBlur in='SourceGraphic' stdDeviation='5' />
                </filter>
                <path className={`${className}__line-path ${className}__line-path_glow`}
                      d={this.state.pathFunc(this.internalData)}
                      filter={`url(#line-time-blur-filter-${this.saltId})`} />
            </g>
        );
        if (line === true) {
            return (
                <g>
                    {glow === true ? glowFilter : null}
                    <path className={`${className}__line-path`}
                          d={this.state.pathFunc(this.internalData)} />
                </g>
            );
        }
        return null;
    }

    render() {
        const { className = BASE_CLASS_NAME } = this.props;

        if (!this.state.pathFunc) {
            return null;
        }

        return (
            <g className={className}>
                {this.renderArea()}
                {this.renderLine()}
            </g>
        );
    }
}

LineTime.propTypes = {
    data: React.PropTypes.array,
    className: React.PropTypes.string,
    glow: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.string,
    ]),
    area: React.PropTypes.bool,
    line: React.PropTypes.bool,
    maxDomain: React.PropTypes.number,
};
