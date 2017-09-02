import React from 'react';
import PropTypes from 'prop-types';
import { axisBottom as d3_axisBottom } from 'd3-axis';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { timeParse as d3_timeParse, timeFormat as d3_timeFormat } from 'd3-time-format';
import { getScaleBand, getScaleLinear, getScaleTime } from '../../services/scales';

const DEFAULT_BASE_CLASS = 'chart-axis';

const axisTypes = {
    LINEAR: 'linear',
    BAND: 'band',
    TIME: 'time',
};

/**
 * AxisX
 */
export default class AxisX extends React.Component {
    componentDidMount() {
        this.createXAxis(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createXAxis(nextProps);
    }

    getXScale(props) {
        const { $$width, $$data } = props;
        const { scale = axisTypes.BAND, timeFormat } = props;
        const { data = $$data } = props;
        const internalData = data.filter((item, index) => index !== 0);

        let x;
        switch (scale) {
            case axisTypes.LINEAR:
                x = getScaleLinear($$width);
                x.domain([d3_max(internalData, item => item[1]), 0]);
                break;
            case axisTypes.TIME:
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
            case axisTypes.BAND:
            default:
                x = getScaleBand($$width);
                x.domain(internalData.map(item => item[0]));
        }

        return x;
    }

    /**
     * Create or update X axis
     * @param props
     */
    createXAxis(props) {
        const { axisTicks = 10, labelTimeFormat, xScale } = props;
        const x = xScale || this.getXScale(props);
        const axis = d3_axisBottom(x).ticks(axisTicks);

        if (labelTimeFormat) {
            axis.tickFormat(d3_timeFormat(labelTimeFormat));
        }

        d3_select(this.xGroup)
            .call(axis);
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
    /**
     * Main data object of the component
     * See `<Chart />`
     */
    data: PropTypes.array,
    /**
     * Axis title
     */
    title: PropTypes.string,
    /**
     * Label time formatting
     * @link https://github.com/d3/d3-time-format
     */
    labelTimeFormat: PropTypes.string,
    /**
     * Component class property for CSS
     */
    className: PropTypes.string,
    /**
     * Axis scale. Determine how to treat components `data`
     */
    scale: PropTypes.oneOf(Object.values(axisTypes)),
    /**
     * Time format of axis labels (by default, expected to be Date() object)
     */
    timeFormat: PropTypes.string,
    /**
     * Axis ticks.
     * Hint to d3 - how many ticks should be generated (default is 10)
     * @link https://github.com/d3/d3-scale/blob/master/README.md#time_ticks
     */
    axisTicks: PropTypes.number,
    /**
     * You can provide scale function directly to the component.
     * In this case component wouldn't calculate it.
     */
    xScale: PropTypes.func,
};
