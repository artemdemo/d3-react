import React, { Component } from 'react';
import { axisLeft as d3_axisLeft, axisRight as d3_axisRight } from 'd3-axis';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { format as d3_format } from 'd3-format';
import _ from '../../libraries/lodash';
import { getScaleBand, getScaleLinear } from '../../services/scales';
import { deltaShape } from '../../propTypes';

const DEFAULT_BASE_CLASS = 'chart-axis';
const axisSide = {
    LEFT: 'left',
    RIGHT: 'right',
};
const axisTypes = {
    LINEAR: 'linear',
    BAND: 'band',
};

/**
 * AxisY
 */
export default class AxisY extends Component {
    componentDidMount() {
        this.createYAxis(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createYAxis(nextProps);
    }

    getYScale(props) {
        const { $$data, $$dataDelta, $$height } = props;
        const { scale = axisTypes.LINEAR } = props;
        const { data = $$data, dataDelta = $$dataDelta } = props;
        const internalData = data.filter((item, index) => index !== 0);

        let y;
        switch (scale) {
            case axisTypes.BAND:
                y = getScaleBand($$height);
                y.domain(internalData.map(item => item[0]));
                break;
            case axisTypes.LINEAR:
            default:
                y = getScaleLinear($$height);
                const maxY = dataDelta && dataDelta.y ?
                dataDelta.y * d3_max(internalData, item => Number(item[1])) :
                    d3_max(internalData, item => Number(item[1]));
                y.domain([0, maxY]);
        }

        return y;
    }

    /**
     * Create or update Y axis
     * @param props
     */
    createYAxis(props) {
        const { axisTicks = 10, position = axisSide.LEFT, labelNumberFormat, yScale } = props;
        const y = yScale || this.getYScale(props);
        let axis;

        switch (position) {
            case axisSide.RIGHT:
                axis = d3_axisRight(y);
                break;
            case axisSide.LEFT:
            default:
                axis = d3_axisLeft(y);
        }

        axis.ticks(axisTicks)
            .tickFormat(d => labelNumberFormat ? d3_format(labelNumberFormat)(d) : d);

        d3_select(this.yGroup)
            .call(axis);
    }

    render() {
        const {
            title = '',
            position = axisSide.LEFT,
            className = DEFAULT_BASE_CLASS,
            $$width = 0,
        } = this.props;
        let groupTransform;
        let textY;

        switch (position) {
            case axisSide.RIGHT:
                groupTransform = `translate(${$$width}, 0)`;
                textY = -13;
                break;
            case axisSide.LEFT:
            default:
                groupTransform = '';
                textY = 6;
        }

        return (
            <g ref={el => this.yGroup = el}
               className={className}
               transform={groupTransform}>
                <text transform='rotate(-90)'
                      className={`${className}__title`}
                      y={textY}
                      dy='0.71em'
                      textAnchor='end'>
                    {title}
                </text>
            </g>
        );
    }
}

AxisY.propTypes = {
    /**
     * Main data object of the component.
     * See `<Chart />`
     */
    data: React.PropTypes.array,
    /**
     * Axis title
     */
    title: React.PropTypes.string,
    /**
     * Component class property for CSS
     */
    className: React.PropTypes.string,
    /**
     * Delta change for maximum data value.
     * Value is in percents.
     */
    dataDelta: deltaShape,
    /**
     * Number formatting for labels
     * @link https://github.com/d3/d3-format
     */
    labelNumberFormat: React.PropTypes.string,
    /**
     * Axis scale. Determine how to treat components `data`
     */
    scale: React.PropTypes.oneOf(_.values(axisTypes)),
    /**
     * Axis position - `left` or `right`.
     */
    position: React.PropTypes.oneOf(_.values(axisSide)),
    /**
     * Axis ticks.
     * Hint to d3 - how many ticks should be generated
     * @link https://github.com/d3/d3-scale/blob/master/README.md#time_ticks
     */
    axisTicks: React.PropTypes.number,
    /**
     * You can provide scale function directly to the component.
     * In this case component wouldn't calculate it.
     */
    yScale: React.PropTypes.func,
};
