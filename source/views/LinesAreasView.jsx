import React, { Component } from 'react';

import { Chart } from '../components/Chart/Chart';
import { AxisX } from '../components/Axis/AxisX';
import { AxisY } from '../components/Axis/AxisY';
import { LineTime } from '../components/Line/LineTime';
import { GridX } from '../components/Grid/GridX';
import { GridY } from '../components/Grid/GridY';
import { Legend } from '../components/Legend/Legend';

import './LinesAreasView.less';

export class LinesAreasView extends Component {
    render() {
        const mainData = [
            ['Year', 'Sales', 'Books', 'Laptops'],
            ['2000', 5500, 100, 150],
            ['2001', 6000, 10, 0],
            ['2002', 5070, 300, 0],
            ['2003', 7000, 400, 200],
            ['2004', 10900, 0, 300],
            ['2005', 9080, 0, 170],
            ['2006', 8650, 300, 100],
            ['2007', 6100, 210, 200],
            ['2008', 7800, 50, 150],
            ['2009', 5200, 0, 170],
            ['2010', 7800, 0, 250],
            ['2011', 6300, 0, 400],
            ['2012', 6900, 200, 0],
            ['2013', 5100, 300, 50],
            ['2014', 4800, 500, 200],
            ['2015', 7700, 100, 470],
            ['2016', 6600, 180, 100],
            ['2017', 10300, 250, 300],
        ];

        const booksData = mainData.map(item => [
            item[0],
            item[2],
        ]);

        const laptopsData = mainData.map(item => [
            item[0],
            item[3],
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
                           bottom: 50,
                           left: 40,
                       }}>
                    <GridX scale='time' ticks={10} />
                    <GridY scale='linear' ticks={10} maxDomain={2500} />
                    <LineTime curve='step' area />
                    <LineTime className='line-chart-laptops'
                              data={laptopsData}
                              curve='step'
                              maxDomain={2500}
                              line={false}
                              area />
                    <LineTime className='line-chart-books'
                              data={booksData}
                              curve='step'
                              maxDomain={2500}
                              line={false}
                              area />
                    <AxisX title={mainData[0][0]}
                           scale='time' />
                    <AxisY position='right' />
                    <AxisY position='left'
                           data={booksData}
                           className='chart-axis-short-domain'
                           maxDomain={2500} />
                    <Legend itemWidth={50} marginTop={40} />
                </Chart>
            </div>
        );
    }
}
