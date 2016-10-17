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

class ZoomLine extends Component {
    constructor(props) {
        super(props);

        this.internalData = [];
        this.x = null;
        this.y = null;
        this.saltId = Math.floor(Math.random() * 10000);

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
        const { $$height } = this.props;
        if (d3_event.sourceEvent && d3_event.sourceEvent.type === 'brush') return;
        const t = d3_event.transform;
        this.x.domain(t.rescaleX(this.x).domain());
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
        const { $$height, $$width, $$data, $$dataDelta } = this.props;
        const { scale = TIME, className = DEFAULT_BASE_CLASS, curve, area, timeFormat } = this.props;
        const { dataDelta = $$dataDelta, data = $$data } = this.props;

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
        const maxY = dataDelta && dataDelta.y ?
            dataDelta.y * d3_max(this.internalData, item => Number(item[1])) :
            d3_max(this.internalData, item => Number(item[1]));
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

        const areaPath = this.state.areaPath || areaPathFunc(this.internalData);
        const linePath = this.state.linePath || linePathFunc(this.internalData);

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
                <AxisY className={`${DEFAULT_BASE_CLASS}__axis`}
                       yScale={this.state.y || this.y}
                       $$width={$$width}
                       $$height={$$height} />
                <AxisX className={`${DEFAULT_BASE_CLASS}__axis`}
                       xScale={this.state.x || this.x}
                       $$width={$$width}
                       $$height={$$height} />
            </g>
        );
    }
}

export default ZoomLine;
