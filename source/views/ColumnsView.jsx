import React, { Component } from 'react';

import { Chart } from '../components/Chart/Chart';
import { AxisX } from '../components/Axis/AxisX';
import { AxisY } from '../components/Axis/AxisY';
import { Columns } from '../components/Columns/Columns';
import { GroupedColumns } from '../components/Columns/GroupedColumns';

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
                           className='columns-chart'
                           width='100%'
                           height='100%'>
                        <AxisX title={columns[0][0]} />
                        <AxisY title={columns[0][1]} />
                        <GroupedColumns />
                    </Chart>
                </div>
            </div>
        );
    }
}
