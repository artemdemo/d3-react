import React, { Component } from 'react';
import { sum as d3_sum } from 'd3-array';

import Chart from '../d3-chart/components/Chart/Chart';
import AxisX from '../d3-chart/components/Axis/AxisX';
import AxisY from '../d3-chart/components/Axis/AxisY';
import GridY from '../d3-chart/components/Grid/GridY';
import LineTime from '../d3-chart/components/Line/LineTime';
import { Columns } from '../d3-chart/components/Columns/Columns';
import StackedColumns from '../d3-chart/components/Columns/StackedColumns';
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

        const stackedColumns = [
            ['Year', 'Under 5', '5 to 13', '13 to 25'],
            ['2011', 300, 500, 750],
            ['2012', 180, 230, 400],
            ['2013', 100, 400, 430],
            ['2014', 400, 520, 830],
            ['2015', 170, 490, 600],
            ['2016', 260, 600, 730],
            ['2017', 230, 600, 980],
        ];

        const stackedColumnsAxisY = stackedColumns.map((columns, index) => {
            if (index === 0) {
                return [
                    'Year',
                    'Group',
                ];
            }
            return [
                columns[0],
                d3_sum(columns.slice(1)),
            ];
        });

        const renderTooltipBox = (d) => {
            return (
                <text className='tooltip-view-box'>{d[1]}</text>
            );
        };

        const renderTooltipBoxStackedChart = (d, index) => {
            const currentItem = stackedColumns[index + 1];
            return (
                <text className='tooltip-view-box'>
                    <tspan x='0' y='0'>{currentItem[1]}</tspan>
                    <tspan x='0' y='15'>{currentItem[2]}</tspan>
                    <tspan x='0' y='30'>{currentItem[3]}</tspan>
                    <tspan x='0' y='45'>Total: {d[1]}</tspan>
                </text>
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
                           timeFormat='%Y'
                           title={lineData[0][0]}
                           className='lines-view__axis' />
                    <AxisY className='legend-view__axis' title={lineData[0][1]} />
                </Chart>

                <Chart data={columns}
                       className='tooltip-view-chart'>
                    <AxisX className='columns-view__axis' timeFormat='%Y' title={columns[0][0]} />
                    <AxisY className='columns-view__axis' title={columns[0][1]} />
                    <Columns className='columns-view-single-chart' />
                    <ToolTip scale='band'
                             className='tooltip-view-tooltip'
                             renderCallback={renderTooltipBox} />
                </Chart>

                <Chart data={stackedColumns}
                       className='tooltip-view-chart'>
                    <AxisX className='columns-view__axis' timeFormat='%Y' title='Groups' />
                    <AxisY className='columns-view__axis' title='Sales' data={stackedColumnsAxisY} />
                    <StackedColumns className='columns-view-stacked-chart' />
                    <ToolTip scale='band'
                             className='tooltip-view-tooltip'
                             data={stackedColumnsAxisY}
                             renderCallback={renderTooltipBoxStackedChart} />
                </Chart>
            </div>
        );
    }
}
