import {
    scaleBand as d3_scaleBand,
    scaleOrdinal as d3_scaleOrdinal,
    scaleLinear as d3_scaleLinear,
    scaleTime as d3_scaleTime,
} from 'd3-scale';

/**
 * Create an ordinal band scale
 * @param width {number}
 * @param options {object}
 * @param options.innerPadding {number}
 * @param options.outerPadding {number}
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
 * @param height {number}
 * @return {*}
 */
export const getScaleLinear = (height) => {
    return d3_scaleLinear().rangeRound([height, 0]);
};

/**
 * Create a time based linear scale
 * @param width {number}
 * @returns {*}
 */
export const getScaleTime = (width) => {
    return d3_scaleTime().range([0, width]);
};

/**
 * Create ordinal scale of classes
 * @param baseClass {string}
 * @param domain {array} array of items
 * @returns {*}
 */
export const getClassesScale = (baseClass, domain) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => `${baseClass}_${letter}`);
    return d3_scaleOrdinal()
        .domain(domain)
        .range(alphabet.slice(0, domain.length));
};
