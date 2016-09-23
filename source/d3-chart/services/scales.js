import {
    scaleBand as d3_scaleBand,
    scaleOrdinal as d3_scaleOrdinal,
    scaleLinear as d3_scaleLinear,
    scaleTime as d3_scaleTime,
} from 'd3-scale';
import { createAlphabetList } from './utils';

/**
 * Create an ordinal band scale
 * @param width {Number}
 * @param options {Object}
 * @param options.innerPadding {Number}
 * @param options.outerPadding {Number}
 * @return {*}
 */
export const getScaleBand = (width, options = {}) => {
    const { innerPadding = 0.1, outerPadding = 0 } = options;
    return d3_scaleBand()
        .rangeRound([0, width])
        .paddingInner(innerPadding)
        .paddingOuter(outerPadding);
};

/**
 * Create a quantitative linear scale
 * @param height {Number}
 * @return {*}
 */
export const getScaleLinear = (height) => {
    return d3_scaleLinear().rangeRound([height, 0]);
};

/**
 * Create a time based linear scale
 * @param width {Number}
 * @returns {*}
 */
export const getScaleTime = (width) => {
    return d3_scaleTime().range([0, width]);
};

/**
 * Create ordinal scale of classes
 * @param baseClass {String}
 * @param domain {Array} array of items
 * @returns {*}
 */
export const getClassesScale = (baseClass, domain) => {
    return d3_scaleOrdinal()
        .domain(domain)
        .range(createAlphabetList(baseClass, domain.length));
};
