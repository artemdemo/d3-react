import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { event as d3Event } from 'd3-selection';
import d3 from '../../libraries/d3';
import { getScale, getScaleBand, getScaleTime } from '../../services/scales';
import nerve from '../../services/nerve';

const DEFAULT_BASE_CLASS = 'chart-brush';
const scaleType = {
    BAND: 'band',
    TIME: 'time',
};

/**
 * Brush
 */
export default class Brush extends Component {
    constructor(props) {
        super(props);

        const { connectId } = props;
        if (connectId) {
            nerve.on({
                route: `${connectId}/update-scale`,
                callback: xScale => this.updateScale(xScale),
            });
        }

        this.state = {
            handleLeft: 0,
            handleRight: 0,
            handleTop: 0,
        };

        this.x = null;
        this.initialX = null;
        this.brush = null;
    }

    componentDidMount() {
        const { connectId } = this.props;
        if (connectId) {
            const initialScale = getScale(`${connectId}-x`);
            this.x = initialScale || this.createXScale(this.props);
            this.initialX = initialScale || this.createXScale(this.props);
        } else {
            this.x = this.createXScale(this.props);
            this.initialX = this.createXScale(this.props);
        }
        this.updateBrushInstance(this.props);
        this.updateBrushElement();
    }

    componentWillReceiveProps(nextProps) {
        const { connectId } = nextProps;
        if (connectId) {
            const initialScale = getScale(`${connectId}-x`);
            this.x = initialScale || this.createXScale(this.props);
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
                const parseTime = timeFormat ? d3.timeParse(timeFormat) : null;
                internalData = internalData.map((item) => {
                    const dateObject = parseTime ? parseTime(item[0]) : item[0];
                    return [
                        dateObject,
                        item[1],
                    ];
                });

                x = getScaleTime($$width);
                x.domain(d3.extent(internalData, item => item[0]));
        }
        return x;
    }

    updateScale(data) {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        this.x = data.x;
        d3.select(this.brushGroup)
            .select(`.${className}__brush`)
            .call(this.brush.move, this.x.range().map(data.t.invertX, data.t));
    }

    updateBrushInstance(props) {
        const { $$width, $$height } = props;

        this.brush = d3.brushX()
            .extent([[0, 0], [$$width, $$height]])
            .on('brush end', () => this.brushHandler());
    }

    updateBrushElement() {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        this.brushGroup.innerHTML = '';
        const gBrush = d3.select(this.brushGroup)
            .append('g')
            .attr('class', `${className}__brush`)
            .call(this.brush);

        if (this.childrenGroup.childElementCount > 0) {
            if (this.childrenGroup.firstChild.classList.length === 0) {
                console.error('[Brush] Handle should have className');
            }
            if (this.childrenGroup.childElementCount > 1) {
                console.error('[Brush] There is more then one child for handle - used first one');
            }
            this.handle = gBrush.selectAll(`.${this.childrenGroup.firstChild.classList[0]}`)
                .data([{type: 'w'}, {type: 'e'}])
                .enter().append(() => this.childrenGroup.firstChild.cloneNode(true));
        }

        gBrush.call(this.brush.move, this.x.range());
    }

    brushHandler() {
        const { connectId, $$height, handleYPosition, onChange, scale = scaleType.TIME } = this.props;
        const s = d3Event.selection || this.x.range();
        if (s && this.handle) {
            const yPosition = handleYPosition ? handleYPosition($$height) : $$height / 2;
            this.handle.attr('transform', (d, i) => {
                return `translate(${s[i]}, ${yPosition})`;
            });
            this.setState({
                handleLeft: s[0],
                handleRight: s[1],
                handleTop: yPosition,
            });
            if (onChange) {
                switch (scale) {
                    case scaleType.BAND:
                        onChange(this.initialX(s[0]), this.initialX(s[1]));
                        break;
                    case scaleType.TIME:
                    default:
                        onChange(this.initialX.invert(s[0]), this.initialX.invert(s[1]));
                }
            }
        }
        if (d3Event.sourceEvent && d3Event.sourceEvent.type === 'zoom') return;
        this.x.domain(s.map(this.x.invert, this.x));
        if (connectId) {
            nerve.send({
                route: `${connectId}/update-brush`,
                data: s,
            });
        }
    }

    render() {
        const { className = DEFAULT_BASE_CLASS, $$width } = this.props;
        return (
            <g className={className}>
                <line className={`${className}__bottom-line`}
                      x1={0}
                      y1={this.state.handleTop}
                      x2={$$width}
                      y2={this.state.handleTop} />
                <line className={`${className}__top-line`}
                      x1={this.state.handleLeft}
                      y1={this.state.handleTop}
                      x2={this.state.handleRight}
                      y2={this.state.handleTop} />
                <g ref={el => this.brushGroup = el} />
                <g style={{display: 'none'}} ref={el => this.childrenGroup = el}>
                    {this.props.children}
                </g>
            </g>
        );
    }
}

Brush.propTypes = {
    connectId: PropTypes.string,
    /**
     * Axis scale. Determine how to treat components `data`
     */
    scale: PropTypes.oneOf(Object.values(scaleType)),
    /**
     * This function should return y position from handle and line in between
     */
    handleYPosition: PropTypes.func,
    /**
     * Callback on brush change
     */
    onChange: PropTypes.func,
};
