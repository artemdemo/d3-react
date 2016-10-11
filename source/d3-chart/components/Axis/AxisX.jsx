import React, { Component } from 'react';
import { axisBottom as d3_axisBottom } from 'd3-axis';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { getScaleBand, getScaleLinear, getScaleTime } from '../../services/scales';

/**
 * AxisX
 */

const DEFAULT_BASE_CLASS = 'chart-axis';
const LINEAR = 'linear';
const BAND = 'band';
const TIME = 'time';

export default class AxisX extends Component {
    componentDidMount() {
        this.createXAxis(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createXAxis(nextProps);
    }

    /**
     * Create or update X axis
     * @param props
     */
    createXAxis(props) {
        const {
            $$width,
            $$data,
            data,
            scale = BAND,
            timeFormat,
        } = props;
        const selectedData = data || $$data;
        const internalData = selectedData.filter((item, index) => index !== 0);
        let x;

        switch (scale) {
            case LINEAR:
                x = getScaleLinear($$width);
                x.domain([d3_max(internalData, item => item[1]), 0]);
                break;
            case TIME:
                const parseTime = timeFormat ? d3_timeParse(timeFormat) : null;
                const dataParsed = internalData.map((item) => {
                    const dateObject = parseTime ? parseTime(item[0]) : item[0];
                    return [
                        dateObject,
                        item[1],
                    ];
                });

                x = getScaleTime($$width);
                x.domain(d3_extent(dataParsed, item => item[0]));
                break;
            case BAND:
            default:
                x = getScaleBand($$width);
                x.domain(internalData.map(item => item[0]));
        }

        d3_select(this.xGroup)
            .call(d3_axisBottom(x));
    }

    render() {
        const {
            title = '',
            className = DEFAULT_BASE_CLASS,
            $$height = 0,
            $$width = 0,
        } = this.props;

        return (
            <g ref={el => this.xGroup = el}
               className={className}
               transform={`translate(0, ${$$height})`}>
                <text transform={`translate(${$$width / 2}, 0)`}
                      className={`${className}__title`}
                      y='20'
                      dy='0.71em'
                      textAnchor='end'>
                    {title}
                </text>
            </g>
        );
    }
}

AxisX.propTypes = {
    data: React.PropTypes.array,
    title: React.PropTypes.string,
    className: React.PropTypes.string,
    scale: React.PropTypes.oneOf([LINEAR, BAND, TIME]),
    timeFormat: React.PropTypes.string,
};
