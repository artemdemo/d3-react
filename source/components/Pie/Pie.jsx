import React, { Component } from 'react';
import _isEqual from 'lodash/isEqual';
import { linefyName } from '../../services/utils';
import { getClassesScale } from '../../services/scales';
import d3 from '../../libraries/d3';

const DEFAULT_BASE_CLASS = 'pie-chart';
const mouseDirection = {
    OVER: 'over',
    OUT: 'out',
};

/**
 * Pie chart
 */
export default class Pie extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sections: [],
            marginLeft: 0,
            marginTop: 0,
        };

        this.hoveredSectionId = null;
    }
    componentDidMount() {
        this.createPie(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.triggerHoverId !== this.props.triggerHoverId) {
            if (nextProps.triggerHoverId !== null) {
                this.hoverSectionHandle(d3.select(
                    this.sections._groups[0][nextProps.triggerHoverId]),
                    mouseDirection.OVER
                );
                this.hoveredSectionId = nextProps.triggerHoverId;
            } else {
                this.hoverSectionHandle(d3.select(
                    this.sections._groups[0][this.hoveredSectionId]),
                    mouseDirection.OUT
                );
                this.hoveredSectionId = null;
            }
        }
        const dataNext = nextProps.data || nextProps.$$data;
        const dataCurrent = this.props.data || this.props.$$data;
        const needRerender = (() => {
            const widthIsSame = nextProps.$$width === this.props.$$width;
            const heightIsSame = nextProps.$$height === this.props.$$height;
            if (!widthIsSame || !heightIsSame) {
                return true;
            }
            const dataIsSame = _isEqual(dataNext, dataCurrent);
            return !dataIsSame;
        })();
        if (needRerender) {
            this.createPie(nextProps);
        }
    }

    hoverSectionHandle(section, mouse = mouseDirection.OVER) {
        const selectionInstance = section.transition().duration(100);
        if (mouse === mouseDirection.OVER) {
            selectionInstance.attr('d', this.arcHoverData);
        } else {
            selectionInstance.attr('d', this.arcData);
        }
    }

    createPie(props) {
        const { $$data, $$width, $$height } = props;
        const { data = $$data, margin = {}, hoverIndent = 10, className = DEFAULT_BASE_CLASS } = props;
        const { outerRadius, innerRadius, labelPadding, colors = [] } = props;

        let calculatedOuterRadius = outerRadius ? outerRadius($$width, $$height) : d3.min([$$width / 2, $$height / 2]);

        const internalData = data.filter((item, index) => index !== 0);

        let marginLeft;
        if (margin.right !== undefined) {
            marginLeft = $$width - calculatedOuterRadius - margin.right;
        } else if (margin.left !== undefined) {
            marginLeft = calculatedOuterRadius + margin.left;
        } else {
            marginLeft = $$width / 2;
        }

        if (marginLeft < calculatedOuterRadius) {
            calculatedOuterRadius = marginLeft;
        }

        let marginTop;
        if (margin.bottom !== undefined) {
            marginTop = $$width - calculatedOuterRadius - margin.bottom;
        } else if (margin.top !== undefined) {
            marginTop = calculatedOuterRadius + margin.top;
        } else {
            marginTop = $$height / 2;
        }

        this.setState({
            marginLeft,
            marginTop,
        });

        let calculatedInnerRadius = 0;
        if (innerRadius) {
            calculatedInnerRadius = innerRadius(calculatedOuterRadius);
        }

        const pieData = d3.pie()
            .value(d => d[1])(internalData);

        this.arcData = d3.arc()
            .outerRadius(calculatedOuterRadius)
            .innerRadius(calculatedInnerRadius);

        if (hoverIndent > 0) {
            this.arcHoverData = d3.arc()
                .outerRadius(calculatedOuterRadius + hoverIndent)
                .innerRadius(calculatedInnerRadius > hoverIndent ?
                calculatedInnerRadius - hoverIndent :
                    calculatedInnerRadius);
        }

        let labelArcData;

        if (labelPadding < calculatedOuterRadius && labelPadding > calculatedInnerRadius) {
            labelArcData = d3.arc()
                .outerRadius(calculatedOuterRadius - labelPadding)
                .innerRadius(calculatedOuterRadius - labelPadding);
        }

        const groupClassesScale =
            getClassesScale(internalData.map(item => `${className}__section_${linefyName(item[0])}`));

        this.pieGroup.innerHTML = '';

        const sectionGroup = d3.select(this.pieGroup)
            .selectAll(`${className}-arc`)
            .data(pieData)
            .enter().append('g')
            .attr('class', `${className}-arc`);

        this.sections = sectionGroup
            .append('path')
            .attr('d', this.arcData)
            .attr('fill', (d, index) => {
                if (colors.length > 0) {
                    return `#${colors[index % colors.length]}`;
                }
            })
            .attr('class', d => `${className}__section ${groupClassesScale(d.data[0])}`);

        const { onMouseOver, onMouseOut } = props;
        if (this.arcHoverData) {
            const self = this;
            this.sections
                .on('mouseover', function(d, i) {
                    self.hoverSectionHandle(d3.select(this), mouseDirection.OVER);
                    if (onMouseOver) {
                        onMouseOver(d, i);
                    }
                })
                .on('mouseout', function(d, i) {
                    self.hoverSectionHandle(d3.select(this), mouseDirection.OUT);
                    if (onMouseOut) {
                        onMouseOut(d, i);
                    }
                });
        }

        if (labelArcData) {
            sectionGroup.append('text')
                .attr('transform', d => `translate(${labelArcData.centroid(d)})`)
                .text(d => d.data[0])
                .attr('class', `${className}__text`);
        }
    }

    render() {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g className={className}
               ref={el => this.pieGroup = el}
               transform={`translate(${this.state.marginLeft}, ${this.state.marginTop})`} />
        );
    }
}

Pie.propTypes = {
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
     * On mouse over callback
     */
    onMouseOver: React.PropTypes.func,
    /**
     * On mouse out callback
     */
    onMouseOut: React.PropTypes.func,
    /**
     * Outer radius of the chart.
     * (for both `pie` and `donut`)
     */
    outerRadius: React.PropTypes.func,
    /**
     * Inner radius in case you need donut instead of pie
     */
    innerRadius: React.PropTypes.func,
    /**
     * Label padding in case you want them to appear on the chart
     */
    labelPadding: React.PropTypes.number,
    /**
     * On hover event section can increase it's size
     */
    hoverIndent: React.PropTypes.number,
    /**
     * In case you need to simulate hover on one of sections - you will need to pass it's id
     * (or `null` if you wont to "unhover" the section)
     */
    triggerHoverId: React.PropTypes.number,
    /**
     * Colors to use for `fill` property of each section
     */
    colors: React.PropTypes.arrayOf(React.PropTypes.string),
    /**
     * Chart position inside <Chart /> component
     */
    margin: React.PropTypes.shape({
        top: React.PropTypes.number,
        right: React.PropTypes.number,
        bottom: React.PropTypes.number,
        left: React.PropTypes.number,
    }),
};
