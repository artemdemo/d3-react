import React from 'react';
import moment from 'moment';

import Chart from '../../../source/components/Chart/Chart';
import AxisX from '../../../source/components/Axis/AxisX';
import AxisY from '../../../source/components/Axis/AxisY';
import GridX from '../../../source/components/Grid/GridX';
import GridY from '../../../source/components/Grid/GridY';
import Line from '../../../source/components/Line/Line';
import Legend from '../../../source/components/Legend/Legend';

import './LinesAreasView.less';

const LinesAreasView = () => {
    let mainData = [
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
    mainData = mainData.map((item, index) => {
        if (index === 0) {
            return item;
        }
        return [
            moment(item[0], 'YYYY').toDate(),
            item[1],
            item[2],
            item[3],
        ];
    });

    const booksData = mainData.map((item, index) => {
        if (index === 0) {
            return item;
        }
        return [
            moment(item[0], 'YYYY').toDate(),
            item[2],
        ];
    });
    const booksDeltaY = 3;

    const laptopsData = mainData.map((item, index) => {
        if (index === 0) {
            return item;
        }
        return [
            moment(item[0], 'YYYY').toDate(),
            item[3],
        ];
    });

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

    return (
        <div>
            <Chart data={mainData}
                   className='lines-areas-view-chart'
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}>
                <GridX className='lines-areas-view-grid'
                       scale='time'
                       ticks={10} />
                <GridY className='lines-areas-view-grid'
                       scale='linear'
                       ticks={10}
                       dataDelta={{y: booksDeltaY}} />
                <Line className='lines-areas-view-main-chart'
                      curve='step'
                      area />
                <Line className='lines-areas-view-laptops'
                      data={laptopsData}
                      curve='step'
                      dataDelta={{y: booksDeltaY}}
                      line={false}
                      area />
                <Line className='lines-areas-view-books'
                      data={booksData}
                      curve='step'
                      dataDelta={{y: booksDeltaY}}
                      line={false}
                      area />
                <AxisX className='lines-areas-view-axis'
                       title={mainData[0][0]}
                       scale='time' />
                <AxisY className='lines-areas-view-axis'
                       position='right' />
                <AxisY className='lines-areas-view-axis
                                      lines-areas-view-axis_short-domain'
                       position='left'
                       data={booksData}
                       dataDelta={{y: booksDeltaY}} />
                <Legend className='lines-areas-view-legend'
                        itemWidth={50}
                        margin={{bottom: -50}}
                        orientation='horizontal' />
            </Chart>
        </div>
    );
};

export default LinesAreasView;
