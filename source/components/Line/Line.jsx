import React from 'react';
import PropTypes from 'prop-types';
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
const curveTypes = {
    STEP: 'step',
    MONOTONE: 'monotone',
};
const axisTypes = {
    BAND: 'band',
    TIME: 'time',
};

/**
 * Line chart
 */
export default class Line extends React.Component {
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
        const { scale = axisTypes.TIME, className = DEFAULT_BASE_CLASS, curve, area, timeFormat } = this.props;
        const { dataDelta = $$dataDelta, data = $$data } = this.props;

        let internalData = data.filter((item, index) => index !== 0);

        if (internalData.length === 0) {
            return null;
        }

        let x;
        switch (scale) {
            case axisTypes.BAND:
                x = getScaleBand($$width);
                x.domain(internalData.map(item => item[0]));
                break;
            case axisTypes.TIME:
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
            case curveTypes.STEP:
                pathFunc.curve(d3_curveStep);
                if (areaFunc) {
                    areaFunc.curve(d3_curveStep);
                }
                break;
            case curveTypes.MONOTONE:
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
    data: PropTypes.array,
    /**
     * Delta change for maximum data value.
     * Value is in percents.
     */
    dataDelta: deltaShape,
    /**
     * Component class property for CSS
     */
    className: PropTypes.string,
    /**
     * Axis scale. Determine how to treat components `data`
     */
    scale: PropTypes.oneOf(Object.values(axisTypes)),
    /**
     * Time format of axis labels (by default, expected to be Date() object)
     */
    timeFormat: PropTypes.string,
    /**
     * Will add glow to the path.
     * Essentially it will add path with gaussian blur filter applied to it.
     */
    glow: PropTypes.bool,
    /**
     * Add area path under the graph.
     * In order to use gradient you'll need to specify `gradientId`.
     */
    area: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.shape({
            gradientId: PropTypes.string,
        }),
    ]),
    /**
     * Whether add or not line path.
     * You can use only `area`
     */
    line: PropTypes.bool,
    /**
     * Line curve type
     */
    curve: PropTypes.oneOf(Object.values(curveTypes)),
};
