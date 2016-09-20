import React, { Component } from 'react';

import { Chart } from '../components/Chart/Chart';
import { Axis } from '../components/Axis/Axis';
import { LineTime } from '../components/Line/LineTime';

export class LinesView extends Component {
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
            <Chart data={line}
                   className='lines-chart'
                   width='100%'
                   height='500'>
                <LineTime />
                <Axis xTitle={line[0][0]}
                      yTitle={line[0][1]}
                      xScale='time' />
            </Chart>
        );
    }
}
