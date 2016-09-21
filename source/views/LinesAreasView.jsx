import React, { Component } from 'react';

import { Chart } from '../components/Chart/Chart';
import { AxisX } from '../components/Axis/AxisX';
import { AxisY } from '../components/Axis/AxisY';
import { LineTime } from '../components/Line/LineTime';
import { GridX } from '../components/Grid/GridX';

import './LinesAreasView.less';

export class LinesAreasView extends Component {
    render() {
        const mainData = [
            ['Year', 'Sales', 'Books'],
            ['2000', 5500, 100],
            ['2001', 6000, 10],
            ['2002', 5070, 300],
            ['2003', 7000, 400],
            ['2004', 10900, 0],
            ['2005', 9080, 0],
            ['2006', 8650, 300],
            ['2007', 6100, 210],
            ['2008', 7800, 50],
            ['2009', 5200, 0],
            ['2010', 7800, 0],
            ['2011', 6300, 0],
            ['2012', 6900, 200],
            ['2013', 5100, 300],
            ['2014', 4800, 500],
            ['2015', 7700, 100],
            ['2016', 6600, 180],
            ['2017', 10300, 250],
        ];

        const booksData = mainData.map(item => [
            item[0],
            item[2],
        ]);

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
                           left: 40,
                       }}>
                    <GridX scale='time' />
                    <LineTime curve='step' area />
                    <LineTime className='line-chart-books' data={booksData} curve='step' area />
                    <AxisX title={mainData[0][0]}
                           scale='time' />
                    <AxisY position='right' />
                    <AxisY position='left' data={booksData} />
                </Chart>
            </div>
        );
    }
}
