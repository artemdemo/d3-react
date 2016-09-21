import React, { Component } from 'react';

import { Chart } from '../components/Chart/Chart';
import { AxisX } from '../components/Axis/AxisX';
import { AxisY } from '../components/Axis/AxisY';
import { Bars } from '../components/Bars/Bars';

export class BarsView extends Component {
    render() {
        const bars = [
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
            <Chart data={bars}
                   className='bars-chart'
                   width='100%'
                   height='500'>
                <Bars />
                <AxisX title={bars[0][0]} scale='linear' />
                <AxisY title={bars[0][1]} scale='band' />
            </Chart>
        );
    }
}
