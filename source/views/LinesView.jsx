import React, { Component } from 'react';

import Chart from '../d3-chart/components/Chart/Chart';
import AxisX from '../d3-chart/components/Axis/AxisX';
import AxisY from '../d3-chart/components/Axis/AxisY';
import LineTime from '../d3-chart/components/Line/LineTime';
import GridX from '../d3-chart/components/Grid/GridX';
import GridY from '../d3-chart/components/Grid/GridY';

import './LinesView.less';

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
            <div>
                <p>
                    <strong>Simple line</strong>
                </p>
                <Chart data={line} className='lines-view-chart'>
                    <GridX className='lines-view__grid' />
                    <LineTime className='lines-view-line' />
                    <AxisX title={line[0][0]}
                           scale='time'
                           timeFormat='%Y'
                           className='lines-view__axis' />
                    <AxisY title={line[0][1]} className='lines-view__axis' />
                </Chart>

                <p>
                    <strong>Steps</strong>
                </p>
                <Chart data={line} className='lines-view-chart'>
                    <GridY scale='linear' ticks={5} className='lines-view__grid' />
                    <LineTime curve='step' className='lines-view-line' />
                    <AxisX title={line[0][0]}
                           scale='time'
                           timeFormat='%Y'
                           className='lines-view__axis' />
                    <AxisY title={line[0][1]} className='lines-view__axis' />
                </Chart>

                <p>
                    <strong>Line with area</strong>
                </p>
                <Chart data={line} className='lines-view-chart'>
                    <LineTime area className='lines-view-line' />
                    <AxisX title={line[0][0]}
                           scale='time'
                           timeFormat='%Y'
                           className='lines-view__axis' />
                    <AxisY title={line[0][1]} className='lines-view__axis' />
                </Chart>
            </div>
        );
    }
}
