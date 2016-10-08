import React, { Component } from 'react';

import { Chart } from '../d3-chart/components/Chart/Chart';
import { AxisX } from '../d3-chart/components/Axis/AxisX';
import { AxisY } from '../d3-chart/components/Axis/AxisY';
import { Columns } from '../d3-chart/components/Columns/Columns';
import { GroupedColumns } from '../d3-chart/components/Columns/GroupedColumns';
import { StackedColumns } from '../d3-chart/components/Columns/StackedColumns';
import { Legend } from '../d3-chart/components/Legend/Legend';

import './ColumnsView.less';

export class ColumnsView extends Component {
    render() {
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

        const groupedColumns = [
            ['Year', 'Books', 'Laptops', 'Displays'],
            ['2011', 300, 500, 20],
            ['2012', 180, 230, 400],
            ['2013', 510, 400, 430],
            ['2014', 400, 320, 230],
            ['2015', 1170, 790, 600],
            ['2016', 660, 600, 430],
            ['2017', 1030, 900, 780],
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

        return (
            <div>
                <div className='columns-view__container'>
                    <Chart data={columns}
                           className='columns-view-chart'>
                        <AxisX className='columns-view__axis' title={columns[0][0]} />
                        <AxisY className='columns-view__axis' title={columns[0][1]} />
                        <Columns className='columns-view-single-chart' />
                    </Chart>
                </div>

                <div className='columns-view__container'>
                    <Chart data={groupedColumns}
                           className='columns-view-chart'>
                        <AxisX className='columns-view__axis' title='Year' />
                        <AxisY className='columns-view__axis' title='Sales' />
                        <Legend itemWidth={60}
                                margin={{left: 30, top: 10}}
                                orientation='vertical'
                                className='columns-view-legend' />
                        <GroupedColumns className='columns-view-grouped-chart' />
                    </Chart>
                </div>

                <div className='columns-view__container'>
                    <Chart data={stackedColumns}
                           className='columns-view-chart'>
                        <AxisX className='columns-view__axis' title='Groups' />
                        <AxisY className='columns-view__axis' title='Years' />
                        <StackedColumns className='columns-view-stacked-chart' />
                        <Legend itemWidth={60}
                                margin={{left: 100, top: 10}}
                                orientation='vertical'
                                className='columns-view-legend' />
                    </Chart>
                </div>
            </div>
        );
    }
}
