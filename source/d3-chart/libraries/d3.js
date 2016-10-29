/**
 * I'm not using the whole library.
 * This file will import only modules that I use in code and then export them as library.
 *
 * @documentation https://github.com/d3/d3/blob/master/API.md
 *
 * **Important**
 * If you need to use `event` from d3 library you will need to import it directly in your file
 * ```
 * import { event as d3Event } from 'd3-selection';
 * ```
 */

import { select } from 'd3-selection';
import { brushX } from 'd3-brush';
import { extent, max } from 'd3-array';
import { timeParse } from 'd3-time-format';
import { line, area, curveStep, curveMonotoneX } from 'd3-shape';
import { zoom, zoomIdentity } from 'd3-zoom';

export default {
    // d3-selection
    select,
    // d3-brush
    brushX,
    // d3-array
    extent,
    max,
    // d3-time-format
    timeParse,
    // d3-shape
    line,
    area,
    curveStep,
    curveMonotoneX,
    // d3-zoom
    zoom,
    zoomIdentity,
};
