import React, { Component } from 'react';
import { select as d3_select } from 'd3-selection';
import { extent as d3_extent, max as d3_max } from 'd3-array';
import { getScaleBand, getScaleTime, getScaleLinear } from '../../services/scales';
import ToolTipLine from './ToolTipLine';

const DEFAULT_BASE_CLASS = '__tooltip';
const DEFAULT_MOUSE_AREA_PERCENT = 0.8;

export class ToolTip extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toolTipLines: [],
        };
    }

    componentDidMount() {
        const { $$data, $$height, $$width } = this.props;

        // Use data without title row
        this.internalData = $$data.filter((item, index) => index !== 0);
        const toolTipLines = this.internalData.map(() => {
            return {
                visible: false,
                x: 0,
            };
        });

        const columnWidth = ($$width / (this.internalData.length - 1)) * DEFAULT_MOUSE_AREA_PERCENT;
        const { x, y } = this.createAxisScale(this.props, this.internalData);

        d3_select(this.columnsGroup).selectAll(`.${DEFAULT_BASE_CLASS}__column`)
            .data(this.internalData)
            .enter().append('rect')
            .attr('class', `${DEFAULT_BASE_CLASS}__column`)
            .attr('fill', 'transparent')
            .attr('x', (d, index) => {
                toolTipLines[index].x = x(d[0]);
                toolTipLines[index].y = y(d[1]);
                return index === 0 ? x(d[0]) : x(d[0]) - (columnWidth / 2);
            })
            .attr('width', (d, index, dataArr) => {
                return index === 0 || index === dataArr.length - 1 ? columnWidth / 2 : columnWidth;
            })
            .attr('height', $$height)
            .on('mouseover', (d, index) => {
                this.setState({
                    toolTipLines: this.state.toolTipLines.map((item, itemIndex) => {
                        return itemIndex === index ? Object.assign(item, {visible: true}) : item;
                    }),
                });
            })
            .on('mouseout', (d, index) => {
                this.setState({
                    toolTipLines: this.state.toolTipLines.map((item, itemIndex) => {
                        return itemIndex === index ? Object.assign(item, {visible: false}) : item;
                    }),
                });
            });

        this.setState({
            toolTipLines,
        });
    }

    componentWillReceiveProps(nextProps) {
        const { $$height, $$width } = nextProps;
        const { x } = this.createAxisScale(nextProps);
        const columnWidth = ($$width / (this.internalData.length - 1)) * 0.5;

        d3_select(this.columnsGroup).selectAll(`.${DEFAULT_BASE_CLASS}__column`)
            .data(this.internalData)
            .attr('x', (d, index) => {
                return index === 0 ? x(d[0]) : x(d[0]) - (columnWidth / 2);
            })
            .attr('width', (d, index, dataArr) => {
                return index === 0 || index === dataArr.length - 1 ? columnWidth / 2 : columnWidth;
            })
            .attr('height', $$height);
    }

    createAxisScale(props, data = this.internalData) {
        const { $$width, $$height } = props;

        // const x = getScaleBand($$width);
        // x.domain(data.map(item => item[0]));

        const x = getScaleTime($$width);
        x.domain(d3_extent(data, item => item[0]));

        const y = getScaleLinear($$height);
        y.domain([0, d3_max(data, item => item[1])]);

        return { x, y };
    }

    render() {
        const { $$height } = this.props;
        return (
            <g className={DEFAULT_BASE_CLASS}>
                <g>
                    {this.state.toolTipLines.map((item, index) => (
                        <ToolTipLine item={item} height={$$height}
                                     className={`${DEFAULT_BASE_CLASS}-line`}
                                     key={`${DEFAULT_BASE_CLASS}-line-${index}`} />
                    ))}
                </g>
                <g ref={(el) => this.columnsGroup = el} />
            </g>
        );
    }
}

ToolTip.propTypes = {
};
