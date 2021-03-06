import React from 'react';
import PropTypes from 'prop-types';
import { axisBottom as d3_axisBottom } from 'd3-axis';
import { max as d3_max, extent as d3_extent } from 'd3-array';
import { timeParse as d3_timeParse } from 'd3-time-format';
import { select as d3_select } from 'd3-selection';
import { getScaleBand, getScaleLinear, getScaleTime } from '../../services/scales';

const DEFAULT_BASE_CLASS = 'chart-grid';
const LINEAR = 'linear';
const TIME = 'time';
const BAND = 'band';

/**
 * Grid X
 *
 * @tutorial https://bl.ocks.org/d3noob/c506ac45617cf9ed39337f99f8511218
 */
class GridX extends React.Component {
    componentDidMount() {
        const { $$data, data } = this.props;
        const selectedData = data || $$data;
        this.internalData = selectedData.filter((item, index) => index !== 0);

        this.createGrid(this.props, this.internalData);
    }

    componentWillReceiveProps(nextProps) {
        this.createGrid(nextProps, this.internalData);
    }

    createGrid(props) {
        const { $$width, $$height, $$data } = props;
        const { scale = BAND, timeFormat, ticks = 10 } = props;
        const { data = $$data } = props;
        const internalData = data.filter((item, index) => index !== 0);
        let x;

        switch (scale) {
            case 'linear':
                x = getScaleLinear($$width);
                x.domain([d3_max(internalData, item => item[1]), 0]);
                break;
            case 'time':
                const parseTime = d3_timeParse(timeFormat);
                const dataParsed = internalData.map(item => {
                    return [
                        parseTime(item[0]),
                        item[1],
                    ];
                });
                x = getScaleTime($$width);
                x.domain(d3_extent(dataParsed, item => item[0]));
                break;
            case 'band':
            default:
                x = getScaleBand($$width);
                x.domain(internalData.map(item => item[0]));
        }

        d3_select(this.gridGroup)
            .call(d3_axisBottom(x)
                .ticks(ticks)
                .tickSize(-$$height)
                .tickFormat(''));
    }

    render() {
        const { $$height, className = DEFAULT_BASE_CLASS } = this.props;
        return (
            <g ref={el => this.gridGroup = el}
               transform={`translate(0, ${$$height})`}
               className={className} />
        );
    }
}

GridX.propTypes = {
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
     * Time format of axis labels (by default, expected to be Date() object)
     */
    timeFormat: PropTypes.string,
};

export default GridX;
