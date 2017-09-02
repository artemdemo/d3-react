import React from 'react';
import PropTypes from 'prop-types';
import { axisLeft as d3_axisLeft } from 'd3-axis';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear, getScaleTime } from '../../services/scales';
import { deltaShape } from '../../propTypes';

const DEFAULT_BASE_CLASS = 'chart-grid';
const LINEAR = 'linear';
const TIME = 'time';
const BAND = 'band';

/**
 * Grid Y
 *
 * @tutorial https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
 */
export default class GridY extends React.Component {
    componentDidMount() {
        this.createGrid(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createGrid(nextProps);
    }

    createGrid(props) {
        const { $$width, $$height, $$data, $$dataDelta } = props;
        const { scale = LINEAR, timeFormat, ticks = 10 } = props;
        const { data = $$data, dataDelta = $$dataDelta } = props;
        const internalData = data.filter((item, index) => index !== 0);
        let y;

        switch (scale) {
            case LINEAR:
                const maxY = dataDelta && dataDelta.y ?
                    dataDelta.y * d3_max(internalData, item => item[1]) :
                    d3_max(internalData, item => item[1]);
                y = getScaleLinear($$height);
                y.domain([0, maxY]);
                break;
            case TIME:
                const parseTime = timeFormat ? d3_timeParse(timeFormat) : null;
                const dataParsed = data.map(item => {
                    return [
                        parseTime(item[0]),
                        item[1],
                    ];
                });
                y = getScaleTime($$height);
                y.domain(d3_extent(dataParsed, item => item[0]));
                break;
            case BAND:
            default:
                y = getScaleBand($$height);
                y.domain(data.map(item => item[0]));
        }

        d3_select(this.gridGroup)
            .call(d3_axisLeft(y)
                .ticks(ticks)
                .tickSize(-$$width)
                .tickFormat(''));
    }

    render() {
        const { className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g ref={(el) => this.gridGroup = el}
               className={className} />
        );
    }
}

GridY.propTypes = {
    /**
     * Main data object of the component.
     * See `<Chart />`
     */
    data: PropTypes.array,
    /**
     * Axis scale. Determine how to treat components `data`
     */
    scale: PropTypes.oneOf([LINEAR, TIME, BAND]),
    /**
     * Component class property for CSS
     */
    className: PropTypes.string,
    /**
     * Axis ticks.
     * Hint to d3 - how many ticks should be generated
     * @link https://github.com/d3/d3-scale/blob/master/README.md#time_ticks
     */
    ticks: PropTypes.number,
    /**
     * Delta change for maximum data value.
     * Value is in percents.
     */
    dataDelta: deltaShape,
    /**
     * Time format of axis labels (by default, expected to be Date() object)
     */
    timeFormat: PropTypes.string,
};
