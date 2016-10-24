import React, {Component} from 'react';
import { select as d3_select, event as d3_event } from 'd3-selection';
import { brushX as d3_brushX } from 'd3-brush';
import { extent as d3_extent } from 'd3-array';
import { timeParse as d3_timeParse } from 'd3-time-format';
import _ from '../../libraries/lodash';
import { getScale, getScaleBand, getScaleTime } from '../../services/scales';
import nerve from '../../services/nerve';

const BRUSH_CLASS = 'brush';
const scaleType = {
    BAND: 'band',
    TIME: 'time',
};

/**
 * Brush
 *
 * Brush & Zoom
 * https://bl.ocks.org/mbostock/34f08d5e11952a80609169b7917d4172
 *
 * Brush & Zoom II
 * https://bl.ocks.org/mbostock/f48fcdb929a620ed97877e4678ab15e6
 *
 * Brush & custom handlers
 * http://bl.ocks.org/mbostock/4349545
 */
export default class Brush extends Component {
    constructor(props) {
        super(props);

        const { connectId } = props;
        if (connectId) {
            nerve.on({
                route: `${connectId}/update-scale`,
                callback: (xScale) => this.updateScale(xScale),
            });
        }

        this.x = null;
        this.brush = null;
    }

    componentDidMount() {
        const { connectId } = this.props;
        if (connectId) {
            const initialScale = getScale(`${connectId}-x`);
            this.x = initialScale ? initialScale : this.createXScale(this.props);
        } else {
            this.x = this.createXScale(this.props);
        }
        this.updateBrushInstance(this.props);
        this.updateBrushElement();
    }

    componentWillReceiveProps(nextProps) {
        const { connectId } = nextProps;
        if (connectId) {
            const initialScale = getScale(`${connectId}-x`);
            this.x = initialScale ? initialScale : this.createXScale(this.props);
        } else {
            this.x = this.createXScale(nextProps);
        }
        this.updateBrushInstance(nextProps);
        this.updateBrushElement();
    }

    createXScale(props) {
        const { $$width, $$data } = props;
        const { scale = scaleType.TIME, timeFormat } = props;
        const { data = $$data } = props;

        let internalData = data.filter((item, index) => index !== 0);

        if (internalData.length === 0) {
            return null;
        }

        let x;
        switch (scale) {
            case scaleType.BAND:
                x = getScaleBand($$width);
                x.domain(internalData.map(item => item[0]));
                break;
            case scaleType.TIME:
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
        return x;
    }

    updateScale(data) {
        this.x = data.x;
        d3_select(this.brushGroup)
            .select(`.${BRUSH_CLASS}`)
            .call(this.brush.move, this.x.range().map(data.t.invertX, data.t));
    }

    updateBrushInstance(props) {
        const { $$width, $$height } = props;

        this.brush = d3_brushX()
            .extent([[0, 0], [$$width, $$height]])
            .on('brush end', () => this.brushHandler());
    }

    updateBrushElement() {
        this.brushGroup.innerHTML = '';
        const gBrush = d3_select(this.brushGroup)
            .append('g')
            .attr('class', `${BRUSH_CLASS}`)
            .call(this.brush);

        if (this.childrenGroup.childElementCount > 0) {
            if (this.childrenGroup.firstChild.classList.length === 0) {
                throw new Error('[Brush] Handle should have className');
            }
            if (this.childrenGroup.childElementCount > 1) {
                throw new Error('[Brush] There is more then one child for handle - used first one');
            }
            this.handle = gBrush.selectAll(`.${this.childrenGroup.firstChild.classList[0]}`)
                .data([{type: 'w'}, {type: 'e'}])
                .enter().append(() => this.childrenGroup.firstChild.cloneNode(true));
        }

        gBrush.call(this.brush.move, this.x.range());
    }

    brushHandler() {
        const { connectId, $$height } = this.props;
        const s = d3_event.selection || this.x.range();
        if (s && this.handle) {
            this.handle.attr('transform', (d, i) => `translate(${s[i]}, ${$$height / 2})`);
        }
        if (d3_event.sourceEvent && d3_event.sourceEvent.type === 'zoom') return;
        this.x.domain(s.map(this.x.invert, this.x));
        if (connectId) {
            nerve.send({
                route: `${connectId}/update-brush`,
                data: s,
            });
        }
    }

    render() {
        return (
            <g>
                <g ref={el => this.brushGroup = el} />
                <g style={{display: 'none'}} ref={el => this.childrenGroup = el}>
                    {this.props.children}
                </g>
            </g>
        );
    }
}

Brush.propTypes = {
    connectId: React.PropTypes.string,
    /**
     * Axis scale. Determine how to treat components `data`
     */
    scale: React.PropTypes.oneOf(_.values(scaleType)),
};
