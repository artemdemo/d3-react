import React, { Component } from 'react';

import { Chart } from '../components/Chart/Chart';
import { AxisX } from '../components/Axis/AxisX';
import { AxisY } from '../components/Axis/AxisY';
import { LineTime } from '../components/Line/LineTime';
import { GridX } from '../components/Grid/GridX';

export class LinesAreasView extends Component {
    render() {
        const line = [
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
            <div>
                <Chart data={line}
                       className='lines-chart'
                       width='100%'
                       height='400'>
                    <GridX scale='time' />
                    <LineTime />
                    <AxisX title={line[0][0]}
                           scale='time' />
                    <AxisY title={line[0][1]} />
                </Chart>
            </div>
        );
    }
}
