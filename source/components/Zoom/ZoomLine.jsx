import React from 'react';
import PropTypes from 'prop-types';
import { event as d3Event } from 'd3-selection';
import d3 from '../../libraries/d3';
import { getScaleLinear, getScaleTime, getScaleBand, setScale } from '../../services/scales';
import nerve from '../../services/nerve';

import AxisY from '../Axis/AxisY';
import AxisX from '../Axis/AxisX';

const ZOOM_CLASS = 'zoom';
const DEFAULT_BASE_CLASS = 'zoom-line-chart';

const curveTypes = {
    STEP: 'step',
    MONOTONE: 'monotone',
};

const scaleType = {
    BAND: 'band',
    TIME: 'time',
};

/**
 * Zoom line
 *
 * Brush & Zoom
 * https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
 */
export default class ZoomLine extends React.Component {
    constructor(props) {
        super(props);

        const { connectId } = props;
        if (connectId) {
            nerve.on({
                route: `${connectId}/update-brush`,
                callback: (s) => this.updateZoom(s),
            });
        }

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
        const { connectId } = nextProps;
        this.applyZoomHandler(nextProps);
        this.propsRender = true;
        if (connectId) {
            // <Brush /> doesn't have x scale by itself, therefore I should pass it
            setScale(this.x, `${connectId}-x`);
        }
    }

    getLinePathFunction() {
        return d3.line()
            .x(d => this.x(d[0]))
            .y(d => this.y(d[1]));
    }

    getAreaPathFunction(height) {
        return d3.area()
            .x(d => this.x(d[0]))
            .y0(height)
            .y1(d => this.y(d[1]));
    }

    applyZoomHandler(props) {
        const { $$height, $$width } = props;

        this.zoom = d3.zoom()
            .scaleExtent([1, Infinity])
            .translateExtent([[0, 0], [$$width, $$height]])
            .extent([[0, 0], [$$width, $$height]])
            .on('zoom', () => this.zoomHandler());

        this.zoomGroup.innerHTML = '';
        d3.select(this.zoomGroup)
            .append('rect')
            .attr('class', `${ZOOM_CLASS}`)
            .attr('style', 'cursor: move; fill: none; pointer-events: all;')
            .attr('width', $$width)
            .attr('height', $$height)
            .call(this.zoom);
    }

    zoomHandler() {
        const { $$height, connectId } = this.props;
        const t = d3Event.transform;
        this.x.domain(t.rescaleX(this.x).domain());
        if (connectId) {
            nerve.send({
                route: `${connectId}/update-scale`,
                data: {
                    x: this.x,
                    t,
                },
            });
        }

        // Get most left x and most right
        // console.log(this.x.invert(0), this.x.invert($$width));

        this.setState({
            linePath: this.getLinePathFunction()(this.internalData),
            areaPath: this.getAreaPathFunction($$height)(this.internalData),
            x: this.x,
            y: this.y,
        });
    }

    updateZoom(s) {
        const { $$width } = this.props;
        const divider = s[1] - s[0] === 0 ? 1 : s[1] - s[0];
        d3.select(this.zoomGroup)
            .select(`.${ZOOM_CLASS}`)
            .call(this.zoom.transform, d3.zoomIdentity
                .scale($$width / divider)
                .translate(-s[0], 0));
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
        const { scale = scaleType.TIME, className = DEFAULT_BASE_CLASS } = this.props;
        const { curve, area, timeFormat, connectId } = this.props;
        const { data = $$data } = this.props;

        this.internalData = data.filter((item, index) => index !== 0);

        if (this.internalData.length === 0) {
            return null;
        }

        switch (scale) {
            case scaleType.BAND:
                this.x = getScaleBand($$width);
                this.x.domain(this.internalData.map(item => item[0]));
                break;
            case scaleType.TIME:
            default:
                const parseTime = timeFormat ? d3.timeParse(timeFormat) : null;
                this.internalData = this.internalData.map((item) => {
                    const dateObject = parseTime ? parseTime(item[0]) : item[0];
                    return [
                        dateObject,
                        item[1],
                    ];
                });

                this.x = getScaleTime($$width);
                this.x.domain(d3.extent(this.internalData, item => item[0]));
        }
        if (connectId) {
            setScale(this.x, `${connectId}-x`);
        }

        this.y = getScaleLinear($$height);
        const maxY = d3.max(this.internalData, item => Number(item[1]));
        this.y.domain([0, maxY]);

        const linePathFunc = this.getLinePathFunction();

        let areaPathFunc = null;

        if (area) {
            areaPathFunc = this.getAreaPathFunction($$height);
        }

        switch (curve) {
            case curveTypes.STEP:
                linePathFunc.curve(d3.curveStep);
                if (area) {
                    areaPathFunc.curve(d3.curveStep);
                }
                break;
            case curveTypes.MONOTONE:
                linePathFunc.curve(d3.curveMonotoneX);
                if (area) {
                    areaPathFunc.curve(d3.curveMonotoneX);
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
                <g ref={el => this.zoomGroup = el} />
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
    data: PropTypes.array,
    /**
     * Component class property for CSS
     */
    className: PropTypes.string,
    /**
     * Axis scale. Determine how to treat components `data`
     */
    scale: PropTypes.oneOf(Object.values(scaleType)),
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
    brush: PropTypes.bool,
};
