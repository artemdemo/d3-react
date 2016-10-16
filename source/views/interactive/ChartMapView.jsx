import React from 'react';

import chartData from './ChartMap.data';
import Chart from '../../d3-chart/components/Chart/Chart';
import AxisX from '../../d3-chart/components/Axis/AxisX';
import AxisY from '../../d3-chart/components/Axis/AxisY';
import Line from '../../d3-chart/components/Line/Line';

import './ChartMapView.less';

const ChartMapView = () => {
    return (
        <div>
            <Chart data={chartData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}
                   className='chart-map-view_main-chart'>
                <AxisX className='chart-map-view__axis'
                       scale='time'
                       timeFormat='%b %Y'
                       title={chartData[0][0]} />
                <AxisY className='chart-map-view__axis'
                       title={chartData[0][1]} />
                <Line className='chart-map-view-line'
                      timeFormat='%b %Y'
                      zoomable
                      area />
            </Chart>

            <Chart data={chartData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}
                   className='chart-map-view_map-chart'>
                <AxisX className='chart-map-view__axis'
                       scale='time'
                       timeFormat='%b %Y'
                       title={chartData[0][0]} />
                <Line className='chart-map-view-line'
                      timeFormat='%b %Y'
                      area />
            </Chart>
        </div>
    );
};

export default ChartMapView;
