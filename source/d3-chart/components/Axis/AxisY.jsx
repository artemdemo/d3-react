import React, { Component } from 'react';
import { axisLeft as d3_axisLeft, axisRight as d3_axisRight } from 'd3-axis';
import { max as d3_max } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear } from '../../services/scales';

/**
 * AxisY
 */
const DEFAULT_BASE_CLASS = 'chart-axis';

export class AxisY extends Component {
    componentDidMount() {
        const { $$data, data } = this.props;
        const selectedData = data || $$data;
        this.internalData = selectedData.filter((item, index) => index !== 0);

        this.createYAxis(this.props, this.internalData);
    }

    componentWillReceiveProps(nextProps) {
        this.createYAxis(nextProps);
    }

    /**
     * Create or update Y axis
     * @param props
     * @param data
     */
    createYAxis(props, data = this.internalData) {
        const {
            $$height,
            scale = 'linear',
            position = 'left',
            maxDomain = d3_max(data, item => item[1]),
        } = props;
        let y;
        let axisPosition;

        switch (scale) {
            case 'band':
                y = getScaleBand($$height);
                y.domain(data.map(item => item[0]));
                break;
            case 'linear':
            default:
                y = getScaleLinear($$height);
                y.domain([0, maxDomain]);
        }

        switch (position) {
            case 'right':
                axisPosition = d3_axisRight(y);
                break;
            case 'left':
            default:
                axisPosition = d3_axisLeft(y);
        }

        d3_select(this.yGroup)
            .call(axisPosition.ticks(10));
    }

    render() {
        const { title = '', position = 'left', className = DEFAULT_BASE_CLASS, $$width } = this.props;
        let groupTransform;
        let textY;

        switch (position) {
            case 'right':
                groupTransform = `translate(${$$width}, 0)`;
                textY = -13;
                break;
            case 'left':
            default:
                groupTransform = '';
                textY = 6;
        }

        return (
            <g ref={(el) => this.yGroup = el}
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
    data: React.PropTypes.array,
    title: React.PropTypes.string,
    className : React.PropTypes.string,
    scale: React.PropTypes.string,
    position: React.PropTypes.string,
    maxDomain: React.PropTypes.number,
    minDomain: React.PropTypes.number,
};
