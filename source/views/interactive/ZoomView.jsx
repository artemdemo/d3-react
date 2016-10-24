import React from 'react';

import chartData from './Zoom.data';
import Chart from '../../d3-chart/components/Chart/Chart';
import AxisX from '../../d3-chart/components/Axis/AxisX';
import Line from '../../d3-chart/components/Line/Line';
import ZoomLine from '../../d3-chart/components/Zoom/ZoomLine';
import Brush from '../../d3-chart/components/Brush/Brush';

import './ZoomView.less';

const ZoomView = () => {
    return (
        <div>
            <p>
                <strong>Zoom on scroll</strong>
            </p>
            <Chart data={chartData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}
                   className='zoom-view__main-chart'>
                <ZoomLine className='zoom-view-line'
                          timeFormat='%b %Y'
                          area />
            </Chart>


            <p>
                <strong>Zoom with brush</strong>
            </p>

            <Chart data={chartData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}
                   className='zoom-view__main-chart'>
                <ZoomLine className='zoom-view-line'
                          timeFormat='%b %Y'
                          connectId='zoom-scale'
                          area />
            </Chart>

            <Chart data={chartData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}
                   className='zoom-view__map-chart'>
                <AxisX className='zoom-view__axis'
                       scale='time'
                       timeFormat='%b %Y'
                       title={chartData[0][0]} />
                <Line className='zoom-view-line'
                      timeFormat='%b %Y'
                      area />
                <Brush connectId='zoom-scale' />
            </Chart>


            <p>
                <strong>Zoom with custom brush</strong>
            </p>



        </div>
    );
};

export default ZoomView;
