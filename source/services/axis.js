import { scaleBand as d3_scaleBand, scaleLinear as d3_scaleLinear } from 'd3-scale';

/**
 * Create an ordinal band scale
 * @param width {number}
 * @return {*}
 */
export const getScaleBand = (width) => {
    return d3_scaleBand().rangeRound([0, width]).padding(0.1);
};

/**
 * Create a quantitative linear scale
 * @param height {number}
 * @return {*}
 */
export const getScaleLinear = (height) => {
    return d3_scaleLinear().rangeRound([height, 0]);
};
