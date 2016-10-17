import React, {Component} from 'react';
import {
    line as d3_line,
    area as d3_area,
    curveStep as d3_curveStep,
    curveMonotoneX as d3_curveMonotoneX,
} from 'd3-shape';
import { zoom as d3_zoom } from 'd3-zoom';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { select as d3_select, event as d3_event } from 'd3-selection';
import { getScaleLinear, getScaleTime, getScaleBand } from '../../services/scales';

import AxisY from '../Axis/AxisY';
import AxisX from '../Axis/AxisX';

const DEFAULT_BASE_CLASS = 'zoom-line-chart';
const STEP = 'step';
const MONOTONE = 'monotone';

const BAND = 'band';
const TIME = 'time';

/**
 * Zoom line
 *
 * Brush & Zoom
 * https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
 */
export default class ZoomLine extends Component {
    constructor(props) {
        super(props);

        this.internalData = [];
        this.x = null;
        this.y = null;
        this.saltId = Math.floor(Math.random() * 10000);
        this.propsRender = false;

        this.state = {
            linePath: null,
            areaPath: null,
            x: null,
            y: null,
        };
    }

    componentDidMount() {
        this.applyZoomHandler(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.applyZoomHandler(nextProps);
        this.propsRender = true;
    }

    getLinePathFunction() {
        return d3_line()
            .x(d => this.x(d[0]))
            .y(d => this.y(d[1]));
    }

    getAreaPathFunction(height) {
        return d3_area()
            .x(d => this.x(d[0]))
            .y0(height)
            .y1(d => this.y(d[1]));
    }

    applyZoomHandler(props) {
        const { $$height, $$width } = props;

        const zoom = d3_zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [$$width, $$height]])
            .extent([[0, 0], [$$width, $$height]])
            .on('zoom', () => this.zoomHandler());

        this.groupZoom.innerHTML = '';
        d3_select(this.groupZoom)
            .append('rect')
            .attr('style', 'cursor: move; fill: none; pointer-events: all;')
            .attr('width', $$width)
            .attr('height', $$height)
            .call(zoom);
    }

    zoomHandler() {
        const { $$height, $$width } = this.props;
        if (d3_event.sourceEvent && d3_event.sourceEvent.type === 'brush') return;
        const t = d3_event.transform;
        this.x.domain(t.rescaleX(this.x).domain());

        // Get most left x and most right
        // console.log(this.x.invert(0), this.x.invert($$width));

        this.setState({
            linePath: this.getLinePathFunction()(this.internalData),
            areaPath: this.getAreaPathFunction($$height)(this.internalData),
            x: this.x,
            y: this.y,
        });
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
                      clipPath={`url(#zoom-line-clip-path-${this.saltId})`} />
            );
        }
        return null;
    }

    renderLine(pathString) {
        const { className = DEFAULT_BASE_CLASS, line = true, glow } = this.props;
        const glowPath = (
            <path className={`${className}__line-path ${className}__line-path_glow`}
                  d={pathString}
                  filter={`url(#zoom-line-blur-filter-${this.saltId})`}
                  clipPath={`url(#zoom-line-clip-path-${this.saltId})`} />
        );
        if (line === true) {
            return (
                <g>
                    {glow === true ? glowPath : null}
                    <path className={`${className}__line-path`}
                          d={pathString}
                          clipPath={`url(#zoom-line-clip-path-${this.saltId})`} />
                </g>
            );
        }
        return null;
    }

    render() {
        const { $$height, $$width, $$data } = this.props;
        const { scale = TIME, className = DEFAULT_BASE_CLASS, curve, area, timeFormat } = this.props;
        const { data = $$data } = this.props;

        this.internalData = data.filter((item, index) => index !== 0);

        if (this.internalData.length === 0) {
            return null;
        }

        switch (scale) {
            case BAND:
                this.x = getScaleBand($$width);
                this.x.domain(this.internalData.map(item => item[0]));
                break;
            case TIME:
            default:
                const parseTime = timeFormat ? d3_timeParse(timeFormat) : null;
                this.internalData = this.internalData.map((item) => {
                    const dateObject = parseTime ? parseTime(item[0]) : item[0];
                    return [
                        dateObject,
                        item[1],
                    ];
                });

                this.x = getScaleTime($$width);
                this.x.domain(d3_extent(this.internalData, item => item[0]));
        }

        this.y = getScaleLinear($$height);
        const maxY = d3_max(this.internalData, item => Number(item[1]));
        this.y.domain([0, maxY]);

        const linePathFunc = this.getLinePathFunction();

        let areaPathFunc = null;

        if (area) {
            areaPathFunc = this.getAreaPathFunction($$height);
        }

        switch (curve) {
            case STEP:
                linePathFunc.curve(d3_curveStep);
                if (area) {
                    areaPathFunc.curve(d3_curveStep);
                }
                break;
            case MONOTONE:
                linePathFunc.curve(d3_curveMonotoneX);
                if (area) {
                    areaPathFunc.curve(d3_curveMonotoneX);
                }
                break;
        }

        const areaPath = this.propsRender || !this.state.linePath ?
            areaPathFunc(this.internalData) :
            this.state.areaPath;
        const linePath = this.propsRender || !this.state.linePath ?
            linePathFunc(this.internalData) :
            this.state.linePath;
        const xScale = this.propsRender || !this.state.x ? this.x : this.state.x;
        const yScale = this.propsRender || !this.state.y ? this.y : this.state.y;

        this.propsRender = false;
        return (
            <g className={className}>
                <defs>
                    <filter id={`zoom-line-blur-filter-${this.saltId}`}
                            x='-2'
                            y='-2'
                            width={$$width}
                            height={$$height}>
                        <feGaussianBlur in='SourceGraphic' stdDeviation='5' />
                    </filter>
                    <clipPath id={`zoom-line-clip-path-${this.saltId}`}>
                        <rect width={$$width}
                              height={$$height} />
                    </clipPath>
                </defs>
                {this.renderArea(areaPath)}
                {this.renderLine(linePath)}
                {this.props.children}
                <g ref={el => this.groupZoom = el} />
                <AxisY className={`${className}__axis`}
                       yScale={yScale}
                       $$width={$$width}
                       $$height={$$height} />
                <AxisX className={`${className}__axis`}
                       xScale={xScale}
                       $$width={$$width}
                       $$height={$$height} />
            </g>
        );
    }
}

ZoomLine.propTypes = {
    /**
     * Main data object of the component
     * See `<Chart />`
     */
    data: React.PropTypes.array,
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
