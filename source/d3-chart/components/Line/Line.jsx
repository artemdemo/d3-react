import React, { Component } from 'react';
import {
    line as d3_line,
    area as d3_area,
    curveStep as d3_curveStep,
    curveMonotoneX as d3_curveMonotoneX,
} from 'd3-shape';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { getScaleLinear, getScaleTime, getScaleBand } from '../../services/scales';
import { deltaShape } from '../../propTypes';

const DEFAULT_BASE_CLASS = 'line-chart';
const STEP = 'step';
const MONOTONE = 'monotone';

const BAND = 'band';
const TIME = 'time';

/**
 * Line chart
 *
 * https://bl.ocks.org/mbostock/02d893e3486c70c4475f
 * https://bl.ocks.org/mbostock/3884955
 *
 * Steps line chart
 * http://bl.ocks.org/shimizu/f7ef798894427a99efe5e173e003260d
 *
 * Different curve lines
 * https://bl.ocks.org/d3noob/ced1b9b18bd8192d2c898884033b5529
 *
 * Brush & Zoom
 * https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
 */
export default class Line extends Component {
    constructor(props) {
        super(props);

        this.saltId = Math.floor(Math.random() * 10000);
    }

    renderArea(pathString) {
        const { className = DEFAULT_BASE_CLASS, area = false } = this.props;
        if (area) {
            const { gradientId } = area;
            let fill = '';
            if (gradientId) {
                fill = `url(#${gradientId})`;
            }
            return (
                <path className={`${className}__area`}
                      d={pathString}
                      fill={fill}
                      clipPath={`url(#line-clip-path-${this.saltId})`} />
            );
        }
        return null;
    }

    renderLine(pathString) {
        const { className = DEFAULT_BASE_CLASS, line = true, glow } = this.props;
        const glowPath = (
            <path className={`${className}__line-path ${className}__line-path_glow`}
                  d={pathString}
                  filter={`url(#line-blur-filter-${this.saltId})`} />
        );
        if (line === true) {
            return (
                <g>
                    {glow === true ? glowPath : null}
                    <path className={`${className}__line-path`}
                          d={pathString} />
                </g>
            );
        }
        return null;
    }

    render() {
        const { $$height, $$width, $$data, $$dataDelta } = this.props;
        const { scale = TIME, className = DEFAULT_BASE_CLASS, curve, area, timeFormat } = this.props;
        const { dataDelta = $$dataDelta, data = $$data } = this.props;

        let internalData = data.filter((item, index) => index !== 0);

        if (internalData.length === 0) {
            return;
        }

        let x;
        switch (scale) {
            case BAND:
                x = getScaleBand($$width);
                x.domain(internalData.map(item => item[0]));
                break;
            case TIME:
            default:
                const parseTime = timeFormat ? d3_timeParse(timeFormat) : null;
                internalData = internalData.map((item) => {
                    const dateObject = parseTime ? parseTime(item[0]) : item[0];
                    return [
                        dateObject,
                        item[1],
                    ];
                });

                x = getScaleTime($$width);
                x.domain(d3_extent(internalData, item => item[0]));
        }

        const y = getScaleLinear($$height);

        const maxY = dataDelta && dataDelta.y ?
        dataDelta.y * d3_max(internalData, item => Number(item[1])) :
            d3_max(internalData, item => Number(item[1]));
        y.domain([0, maxY]);

        const pathFunc = d3_line()
            .x(d => x(d[0]))
            .y(d => y(d[1]));

        let areaFunc = null;

        if (area) {
            areaFunc = d3_area()
                .x(d => x(d[0]))
                .y0($$height)
                .y1(d => y(d[1]));
        }

        switch (curve) {
            case STEP:
                pathFunc.curve(d3_curveStep);
                if (areaFunc) {
                    areaFunc.curve(d3_curveStep);
                }
                break;
            case MONOTONE:
                pathFunc.curve(d3_curveMonotoneX);
                if (areaFunc) {
                    areaFunc.curve(d3_curveMonotoneX);
                }
                break;
        }

        return (
            <g className={className}>
                <defs>
                    <filter id={`line-blur-filter-${this.saltId}`}
                            x='-2'
                            y='-2'
                            width={$$width}
                            height={$$height}>
                        <feGaussianBlur in='SourceGraphic' stdDeviation='5' />
                    </filter>
                </defs>
                {area ? this.renderArea(areaFunc(internalData)) : null}
                {this.renderLine(pathFunc(internalData))}
                {this.props.children}
            </g>
        );
    }
}

Line.propTypes = {
    /**
     * Main data object of the component
     * See `<Chart />`
     */
    data: React.PropTypes.array,
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
    scale: React.PropTypes.oneOf([BAND, TIME]),
    /**
     * Time format of axis labels (by default, expected to be Date() object)
     */
    timeFormat: React.PropTypes.string,
    /**
     * Will add glow to the path.
     * Essentially it will add path with gaussian blur filter applied to it.
     */
    glow: React.PropTypes.bool,
    /**
     * Add area path under the graph.
     * In order to use gradient you'll need to specify `gradientId`.
     */
    area: React.PropTypes.oneOfType([
        React.PropTypes.bool,
        React.PropTypes.shape({
            gradientId: React.PropTypes.string,
        }),
    ]),
    /**
     * Whether add or not line path.
     * You can use only `area`
     */
    line: React.PropTypes.bool,
    /**
     * Line curve type
     */
    curve: React.PropTypes.oneOf([STEP, MONOTONE]),
};
