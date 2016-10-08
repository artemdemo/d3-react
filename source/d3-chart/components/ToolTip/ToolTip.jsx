import React, { Component } from 'react';
import { select as d3_select } from 'd3-selection';
import { extent as d3_extent, max as d3_max, sum as d3_sum } from 'd3-array';
import { getScaleBand, getScaleTime, getScaleLinear } from '../../services/scales';
import ToolTipLine from './ToolTipLine';

const DEFAULT_BASE_CLASS = '__tooltip';
const DEFAULT_MOUSE_AREA_PERCENT = 0.8;
const DEFAULT_TOOLTIP_POSITION_DELTA = 5;
const DEFAULT_SCALE = 'band';

export class ToolTip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toolTipLines: [],
            showTooltip: false,
            toolTipX: 0,
            toolTipY: 0,
            toolTipBox: null,
        };
    }

    componentDidMount() {
        const {
            $$data,
            $$height,
            $$width,
            data,
            renderCallback,
            className = DEFAULT_BASE_CLASS,
            scale = DEFAULT_SCALE,
        } = this.props;
        const selectedData = data || $$data;

        // Use data without title row
        this.internalData = selectedData.filter((item, index) => index !== 0);
        const toolTipLines = this.internalData.map(() => {
            return {
                visible: false,
                x: 0,
                y: 0,
            };
        });

        const columnWidth = ($$width / (this.internalData.length - 1)) * DEFAULT_MOUSE_AREA_PERCENT;
        const { x, y } = this.createAxisScale(this.props, this.internalData);

        d3_select(this.columnsGroup).selectAll(`.${className}__column`)
            .data(this.internalData)
            .enter().append('rect')
            .attr('class', `${className}__column`)
            .attr('fill', 'transparent')
            .attr('x', (d, index) => {
                const yPosition = d3_max(d.slice(1));
                toolTipLines[index].y = y(yPosition);
                switch (scale) {
                    case 'time':
                        toolTipLines[index].x = x(d[0]);
                        return index === 0 ? x(d[0]) : x(d[0]) - (columnWidth / 2);
                    case 'band':
                    default:
                        toolTipLines[index].x = x(d[0]) + (columnWidth / 2);
                        return x(d[0]);
                }
            })
            .attr('width', (d, index, dataArr) => {
                switch (scale) {
                    case 'time':
                        return index === 0 || index === dataArr.length - 1 ? columnWidth / 2 : columnWidth;
                    case 'band':
                    default:
                        return columnWidth;
                }
            })
            .attr('height', $$height)
            .on('mouseenter', (d, index, dataArr) => {
                let toolTipX = 0;
                let toolTipY = 0;
                this.setState({
                    toolTipLines: this.state.toolTipLines.map((item, itemIndex) => {
                        if (itemIndex === index) {
                            toolTipX = item.x + DEFAULT_TOOLTIP_POSITION_DELTA;
                            toolTipY = item.y - DEFAULT_TOOLTIP_POSITION_DELTA;
                            return Object.assign(item, {visible: true});
                        }
                        return item;
                    }),
                    showTooltip: true,

                    // Tooltip is passed via callback case I want to pass him current item,
                    // otherwise he wouldn't know what is he rendering.
                    // In this way he will be able to make template and fill it with right data for each tooltip
                    toolTipBox: renderCallback(d, index),
                    toolTipX,
                    toolTipY,
                });
            })
            .on('mouseout', (d, index) => {
                this.setState({
                    toolTipLines: this.state.toolTipLines.map((item, itemIndex) => {
                        return itemIndex === index ? Object.assign(item, {visible: false}) : item;
                    }),
                    showTooltip: false,
                });
            });

        this.setState({
            toolTipLines,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { $$height, $$width, scale = DEFAULT_SCALE, className = DEFAULT_BASE_CLASS } = nextProps;
        const columnWidth = ($$width / (this.internalData.length - 1)) * 0.5;
        const toolTipLines = this.state.toolTipLines.slice();
        const { x, y } = this.createAxisScale(nextProps, this.internalData);

        d3_select(this.columnsGroup).selectAll(`.${className}__column`)
            .data(this.internalData)
            .attr('x', (d, index) => {
                toolTipLines[index].y = y(d[1]);
                switch (scale) {
                    case 'time':
                        toolTipLines[index].x = x(d[0]);
                        return index === 0 ? x(d[0]) : x(d[0]) - (columnWidth / 2);
                    case 'band':
                    default:
                        toolTipLines[index].x = x(d[0]) + (x.bandwidth() / 2);
                        return x(d[0]) + ((x.bandwidth() - (x.bandwidth() * DEFAULT_MOUSE_AREA_PERCENT)) / 2);
                }
            })
            .attr('width', (d, index, dataArr) => {
                switch (scale) {
                    case 'time':
                        return index === 0 || index === dataArr.length - 1 ? columnWidth / 2 : columnWidth;
                    case 'band':
                    default:
                        return x.bandwidth() * DEFAULT_MOUSE_AREA_PERCENT;
                }
            })
            .attr('height', $$height);

        this.setState({
            toolTipLines,
        });
    }

    createAxisScale(props, data = this.internalData) {
        const { $$width, $$height, scale = DEFAULT_SCALE } = props;
        let x;

        switch (scale) {
            case 'time':
                x = getScaleTime($$width);
                x.domain(d3_extent(data, item => item[0]));
                break;
            case 'band':
            default:
                x = getScaleBand($$width);
                x.domain(data.map(item => item[0]));
        }

        const y = getScaleLinear($$height);
        y.domain([0, d3_max(data, item => d3_max(item.slice(1)))]);

        return { x, y };
    }

    render() {
        const { $$height, className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g className={className}>
                <g>
                    {this.state.toolTipLines.map((item, index) => (
                        <ToolTipLine item={item} height={$$height}
                                     className={`${className}-line`}
                                     key={`${className}-line-${index}`} />
                    ))}
                </g>
                <g style={{display: this.state.showTooltip ? 'initial' : 'none'}}
                   transform={`translate(${this.state.toolTipX}, ${this.state.toolTipY})`}>
                    {this.state.toolTipBox}
                </g>
                <g ref={(el) => this.columnsGroup = el} />
            </g>
        );
    }
}

ToolTip.propTypes = {
    data: React.PropTypes.array,
    renderCallback: React.PropTypes.func,
    scale: React.PropTypes.oneOf(['band', 'time']),
};
