import React from 'react';

import Chart from '../../source/components/Chart/Chart';
import AxisX from '../../source/components/Axis/AxisX';
import AxisY from '../../source/components/Axis/AxisY';
import GridX from '../../source/components/Grid/GridX';
import GridY from '../../source/components/Grid/GridY';
import Line from '../../source/components/Line/Line';

import './LinesView.less';

const LinesView = () => {
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
                <Line className='lines-view-line' />
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
                <Line curve='step' className='lines-view-line' />
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
                <Line area className='lines-view-line' />
                <AxisX title={line[0][0]}
                       scale='time'
                       timeFormat='%Y'
                       className='lines-view__axis' />
                <AxisY title={line[0][1]} className='lines-view__axis' />
            </Chart>
        </div>
    );
};

export default LinesView;
