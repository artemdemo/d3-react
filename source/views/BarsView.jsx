import React, { Component } from 'react';

import { Chart } from '../d3-chart/components/Chart/Chart';
import { AxisX } from '../d3-chart/components/Axis/AxisX';
import { AxisY } from '../d3-chart/components/Axis/AxisY';
import { Bars } from '../d3-chart/components/Bars/Bars';
import { GroupedBars } from '../d3-chart/components/Bars/GroupedBars';

import './BarsView.less';

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
            ['2017', 1030],
        ];

        const groupedBars = [
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
                <div className='bars-view__container'>
                    <Chart data={bars}
                           width='100%'
                           height='100%'>
                        <Bars className='bars-view__bar' />
                        <AxisX className='bars-view__axis'
                               title={bars[0][0]}
                               scale='linear' />
                        <AxisY className='bars-view__axis'
                               title={bars[0][1]}
                               scale='band' />
                    </Chart>
                </div>

                <div className='bars-view__container'>
                    <Chart data={groupedBars}
                           width='100%'
                           height='100%'>
                        <GroupedBars className='bars-view-grouped-chart' />
                        <AxisX className='bars-view__axis'
                               title={bars[0][0]}
                               scale='linear' />
                        <AxisY className='bars-view__axis'
                               title={bars[0][1]}
                               scale='band' />
                    </Chart>
                </div>

            </div>
        );
    }
}
