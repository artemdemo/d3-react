import React, { Component } from 'react';

import { Chart } from '../components/Chart/Chart';
import { AxisX } from '../components/Axis/AxisX';
import { AxisY } from '../components/Axis/AxisY';
import { Columns } from '../components/Columns/Columns';

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
        return (
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
        );
    }
}
