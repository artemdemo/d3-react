import React, { Component } from 'react';

import { Chart } from '../components/Chart/Chart';
import { AxisX } from '../components/Axis/AxisX';
import { AxisY } from '../components/Axis/AxisY';
import { LineTime } from '../components/Line/LineTime';
import { GridX } from '../components/Grid/GridX';

export class LinesAreasView extends Component {
    render() {
        const mainData = [
            ['Year', 'Sales'],
            ['2000', 5500],
            ['2001', 6000],
            ['2002', 5070],
            ['2003', 7000],
            ['2004', 10900],
            ['2005', 9080],
            ['2006', 8650],
            ['2007', 6100],
            ['2008', 7800],
            ['2009', 5200],
            ['2010', 7800],
            ['2011', 6300],
            ['2012', 6900],
            ['2013', 5100],
            ['2014', 4800],
            ['2015', 7700],
            ['2016', 6600],
            ['2017', 10300],
        ];

        return (
            <div>
                <Chart data={mainData}
                       className='lines-chart'
                       width='100%'
                       height='400'
                       margin={{
                           top: 20,
                           right: 40,
                           bottom: 30,
                           left: 20,
                       }}>
                    <GridX scale='time' />
                    <LineTime curve='step' area />
                    <AxisX title={line[0][0]}
                           scale='time' />
                    <AxisY title={line[0][1]}
                           position='right' />
                </Chart>
            </div>
        );
    }
}
