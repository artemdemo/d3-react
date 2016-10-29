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
import { extent } from 'd3-array';
import { timeParse } from 'd3-time-format';

export default {
    select,
    brushX,
    extent,
    timeParse,
};
