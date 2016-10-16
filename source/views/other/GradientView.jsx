import React, { Component } from 'react';
import _ from 'underscore';

import Chart from '../../d3-chart/components/Chart/Chart';
import AxisX from '../../d3-chart/components/Axis/AxisX';
import AxisY from '../../d3-chart/components/Axis/AxisY';
import Line from '../../d3-chart/components/Line/Line';
import GridX from '../../d3-chart/components/Grid/GridX';
import GridY from '../../d3-chart/components/Grid/GridY';
import { Legend } from '../../d3-chart/components/Legend/Legend';

import './GradientView.less';

export class GradientView extends Component {
    constructor(props) {
        super(props);
        this.backgroundColor = 'black';
    }

    componentWillMount() {
        document.querySelector('body').style.backgroundColor = 'black';
    }

    componentWillUnmount() {
        document.querySelector('body').style.backgroundColor = 'white';
    }

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
        const booksDeltaY = 3;

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
                <button type='button'
                        className='btn btn-default'
                        onClick={() => {
                            this.backgroundColor = this.backgroundColor === 'white' ? 'black' : 'white';
                            document.querySelector('body').style.backgroundColor = this.backgroundColor;
                        }}>
                    Toggle dark background
                </button>
                <Chart data={mainData}
                       className='gradient-view-chart'
                       margin={{
                           top: 20,
                           right: 40,
                           bottom: 50,
                           left: 40,
                       }}>
                    <GridX className='gradient-view-grid'
                           scale='time'
                           ticks={10} />
                    <GridY className='gradient-view-grid'
                           scale='linear'
                           ticks={10}
                           dataDelta={{y: booksDeltaY}} />
                    <Line className='gradient-view-main-chart'
                          area={{gradientId: 'main-area-gradient'}}
                          curve='step'
                          glow >
                        <defs>
                            <linearGradient id='main-area-gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                                <stop offset='0%' stopColor='#0f2e48' />
                                <stop offset='20%' stopColor='#0f2e48' />
                                <stop offset='100%' stopColor='#115c9b' />
                            </linearGradient>
                        </defs>
                    </Line>
                    <Line className='gradient-view-laptops'
                              data={laptopsData}
                              curve='step'
                              dataDelta={{y: booksDeltaY}}
                              line={false}
                              area={{gradientId: 'laptops-area-gradient'}}>
                        <defs>
                            <linearGradient id='laptops-area-gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                                <stop offset='0%' stopColor='red' />
                                <stop offset='20%' stopColor='red' />
                                <stop offset='100%' stopColor='#e0cf42' />
                            </linearGradient>
                        </defs>
                    </Line>
                    <Line className='gradient-view-books'
                              data={booksData}
                              curve='step'
                              dataDelta={{y: booksDeltaY}}
                              line={false}
                              area={{gradientId: 'books-area-gradient'}} >
                        <defs>
                            <linearGradient id='books-area-gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
                                <stop offset='0%' stopColor='#00a8ff' />
                                <stop offset='20%' stopColor='#00a8ff' />
                                <stop offset='100%' stopColor='#0ea30c' />
                            </linearGradient>
                        </defs>
                    </Line>
                    <AxisX className='lines-areas-view-axis'
                           timeFormat='%Y'
                           title={mainData[0][0]}
                           scale='time' />
                    <AxisY className='lines-areas-view-axis'
                           position='right' />
                    <AxisY className='lines-areas-view-axis
                                      lines-areas-view-axis_short-domain'
                           position='left'
                           data={booksData}
                           dataDelta={{y: booksDeltaY}} />
                    <Legend className='gradient-view-legend'
                            itemWidth={50}
                            margin={{bottom: -50}}
                            orientation='horizontal' />
                </Chart>
            </div>
        );
    }
}
