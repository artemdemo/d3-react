import React, { Component } from 'react';
import _ from 'underscore';

import { Chart } from '../d3-chart/components/Chart/Chart';
import { AxisX } from '../d3-chart/components/Axis/AxisX';
import { AxisY } from '../d3-chart/components/Axis/AxisY';
import { LineTime } from '../d3-chart/components/Line/LineTime';
import { GridX } from '../d3-chart/components/Grid/GridX';
import { GridY } from '../d3-chart/components/Grid/GridY';
import { Legend } from '../d3-chart/components/Legend/Legend';

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

        const salesList = [];
        const booksList = [];
        const laptopsList = [];

        mainData.forEach((row, index) => {
            if (index !== 0) {
                salesList.push(row[1]);
                booksList.push(row[2]);
                laptopsList.push(row[3]);
            }
        });

        const maxDomain = _.max([
            _.min(salesList),
            _.max(booksList),
            _.max(laptopsList),
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
                    <GridY scale='linear'
                           ticks={10}
                           maxDomain={maxDomain} />
                    <LineTime curve='step' area />
                    <LineTime className='line-chart-laptops'
                              data={laptopsData}
                              curve='step'
                              maxDomain={maxDomain}
                              line={false}
                              area />
                    <LineTime className='line-chart-books'
                              data={booksData}
                              curve='step'
                              maxDomain={maxDomain}
                              line={false}
                              area />
                    <AxisX title={mainData[0][0]}
                           scale='time' />
                    <AxisY position='right' />
                    <AxisY position='left'
                           data={booksData}
                           className='chart-axis-short-domain'
                           maxDomain={maxDomain} />
                    <Legend itemWidth={50} marginTop={30} />
                </Chart>
            </div>
        );
    }
}
