import React, { Component } from 'react';

import Chart from '../../source/components/Chart/Chart';
import AxisX from '../../source/components/Axis/AxisX';
import AxisY from '../../source/components/Axis/AxisY';
import { Legend } from '../../source/components/Legend/Legend';

import './LegendView.less';

class LegendView extends Component {
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
            <Chart data={mainData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}
                   className='legend-view-chart'>
                <AxisX className='legend-view__axis' timeFormat='%Y' title={mainData[0][0]} />
                <AxisY className='legend-view__axis' title={mainData[0][1]} />
                <Legend itemWidth={60}
                        className='legend-view-legend'
                        margin={{top: 10, left: 30 }}
                        orientation='vertical' />
                <Legend itemWidth={60}
                        className='legend-view-legend'
                        margin={{top: 10, right: 30 }}
                        orientation='horizontal' />
                <Legend itemWidth={60}
                        className='legend-view-legend'
                        margin={{bottom: 1, right: 30 }}
                        orientation='vertical' />
                <Legend itemWidth={60}
                        className='legend-view-legend'
                        margin={{bottom: -50}}
                        orientation='horizontal' />
            </Chart>
        );
    }
}

export default LegendView;
