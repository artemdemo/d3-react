import React, { Component } from 'react';

import { Chart } from '../d3-chart/components/Chart/Chart';
import { AxisX } from '../d3-chart/components/Axis/AxisX';
import { AxisY } from '../d3-chart/components/Axis/AxisY';
import { Columns } from '../d3-chart/components/Columns/Columns';
import { GroupedColumns } from '../d3-chart/components/Columns/GroupedColumns';

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

        return (
            <div>
                <div className='columns-chart-container'>
                    <Chart data={columns}
                           className='columns-chart'
                           width='100%'
                           height='100%'>
                        <AxisX title={columns[0][0]} />
                        <AxisY title={columns[0][1]} />
                        <Columns />
                    </Chart>
                </div>

                <div className='columns-chart-container'>
                    <Chart data={groupedColumns}
                           className='grouped-columns-chart'
                           width='100%'
                           height='100%'>
                        <AxisX title={groupedColumns[0][0]} />
                        <AxisY title={groupedColumns[0][1]} />
                        <GroupedColumns />
                    </Chart>
                </div>
            </div>
        );
    }
}
