import React, { Component } from 'react';

import { Chart } from '../d3-chart/components/Chart/Chart';
import { AxisX } from '../d3-chart/components/Axis/AxisX';
import { AxisY } from '../d3-chart/components/Axis/AxisY';
import { Legend } from '../d3-chart/components/Legend/Legend';

import './LegendView.less';

export class LegendView extends Component {
    render() {
        const mainData = [
            ['Year', 'Books', 'Laptops', 'Displays'],
            ['2011', 300, 500, 20],
            ['2012', 180, 230, 400],
            ['2013', 510, 400, 430],
            ['2014', 400, 320, 230],
            ['2015', 1170, 790, 600],
            ['2016', 660, 600, 430],
            ['2017', 1030, 900, 780],
        ];

        return (
            <div>
                <div className='chart-container'>
                    <Chart data={mainData}
                           className='legend-chart'
                           margin={{
                               top: 20,
                               right: 40,
                               bottom: 50,
                               left: 40,
                           }}
                           width='100%'
                           height='400'>
                        <AxisX title={mainData[0][0]} />
                        <AxisY title={mainData[0][1]} />
                        <Legend itemWidth={60}
                                className='chart-legend-example'
                                margin={{top: 10, left: 30 }}
                                orientation='vertical' />
                        <Legend itemWidth={60}
                                className='chart-legend-example'
                                margin={{top: 10, right: 30 }}
                                orientation='horizontal' />
                        <Legend itemWidth={60}
                                className='chart-legend-example'
                                margin={{bottom: 1, right: 30 }}
                                orientation='vertical' />
                        <Legend itemWidth={60}
                                className='chart-legend-example'
                                margin={{bottom: -50}}
                                orientation='horizontal' />
                    </Chart>
                </div>
            </div>
        );
    }
}
