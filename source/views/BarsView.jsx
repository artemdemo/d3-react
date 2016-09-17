import React, { Component } from 'react';

import { Chart } from '../components/Chart/Chart';
import { Axis } from '../components/Axis/Axis';
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
            ['2017', 1030]
        ];
        return (
            <Chart data={bars}>
                <Axis />
                <Bars />
            </Chart>
        );
    }
}
