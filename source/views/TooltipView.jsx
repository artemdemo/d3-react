import React, { Component } from 'react';

import { Chart } from '../d3-chart/components/Chart/Chart';
import { AxisX } from '../d3-chart/components/Axis/AxisX';
import { AxisY } from '../d3-chart/components/Axis/AxisY';
import { GridY } from '../d3-chart/components/Grid/GridY';
import { LineTime } from '../d3-chart/components/Line/LineTime';
import { Columns } from '../d3-chart/components/Columns/Columns';
import { ToolTip } from '../d3-chart/components/ToolTip/ToolTip';

import './TooltipView.less';

export class TooltipView extends Component {
    render() {
        const lineData = [
            ['Year', 'Sales'],
            ['2011', 300],
            ['2012', 180],
            ['2013', 510],
            ['2014', 400],
            ['2015', 1170],
            ['2016', 660],
            ['2017', 1030],
        ];

        const columns = [
            ['Year', 'Sales'],
            ['2011', 300],
            ['2012', 180],
            ['2013', 510],
            ['2014', 400],
            ['2015', 1170],
            ['2016', 660],
            ['2017', 1030],
        ];

        const renderTooltipBox = (d, index, dataArray) => {
            return (
                <text>{d[1]}</text>
            );
        };

        return (
            <div>
                <Chart data={lineData}
                       margin={{
                           top: 20,
                           right: 40,
                           bottom: 50,
                           left: 40,
                       }}
                       className='tooltip-view-chart'>
                    <GridY scale='linear' ticks={5} className='lines-view__grid' />
                    <LineTime curve='step' className='tooltip-view-line' />
                    <ToolTip scale='time'
                             className='tooltip-view-tooltip'
                             renderCallback={renderTooltipBox} />
                    <AxisX scale='time'
                           title={lineData[0][0]}
                           className='lines-view__axis' />
                    <AxisY className='legend-view__axis' title={lineData[0][1]} />
                </Chart>

                <Chart data={columns}
                       className='tooltip-view-chart'>
                    <AxisX className='columns-view__axis' title={columns[0][0]} />
                    <AxisY className='columns-view__axis' title={columns[0][1]} />
                    <Columns className='columns-view-single-chart' />
                    <ToolTip scale='band'
                             className='tooltip-view-tooltip'
                             renderCallback={renderTooltipBox} />
                </Chart>
            </div>
        );
    }
}