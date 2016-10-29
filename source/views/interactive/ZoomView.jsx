import React from 'react';

import chartData from './Zoom.data';
import Chart from '../../d3-chart/components/Chart/Chart';
import AxisX from '../../d3-chart/components/Axis/AxisX';
import AxisY from '../../d3-chart/components/Axis/AxisY';
import Line from '../../d3-chart/components/Line/Line';
import ZoomLine from '../../d3-chart/components/Zoom/ZoomLine';
import Brush from '../../d3-chart/components/Brush/Brush';
import Rectangle from '../../d3-chart/components/Rectangle/Rectangle';

import './ZoomView.less';

const ZoomView = () => {
    const zoomOne = () => (
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
        </div>
    );

    const zoomTwo = () => (
        <div>
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
        </div>
    );

    const zoomThree = () => (
        <div>
            <p>
                <strong>Zoom with custom brush handle #1</strong>
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
                          connectId='zoom-scale-custom-brush-handle'
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
                <Brush connectId='zoom-scale-custom-brush-handle'>
                    <circle r='10' className='handle--custom' />
                </Brush>
            </Chart>
        </div>
    );

    const zoomFour = () => (
        <div>
            <p>
                <strong>Zoom with custom brush handle #2</strong>
            </p>

            <Chart data={chartData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}
                   className='zoom-view__main-chart_brush-selection'>
                <AxisX className='zoom-view__axis'
                       scale='time'
                       timeFormat='%b %Y'
                       title={chartData[0][0]} />
                <AxisY className='zoom-view__axis'
                       timeFormat='%b %Y' />
                <Line className='zoom-view-line'
                      timeFormat='%b %Y'
                      area />
                <Rectangle className='zoom-view__brush-selection'
                           connectId='zoom-scale-custom-brush' />
            </Chart>

            <Chart data={chartData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}
                   className='zoom-view__main-chart_brush-selection'>
                <AxisX className='zoom-view__axis'
                       scale='time'
                       timeFormat='%b %Y'
                       title={chartData[0][0]} />
                <AxisY className='zoom-view__axis'
                       timeFormat='%b %Y' />
                <Line className='zoom-view-line'
                      timeFormat='%b %Y'
                      area />
                <Rectangle className='zoom-view__brush-selection'
                           connectId='zoom-scale-custom-brush' invert />
            </Chart>

            <Chart data={chartData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 50,
                       left: 40,
                   }}
                   className='zoom-view__map-chart'>
                <Brush connectId='zoom-scale-custom-brush'>
                    <circle r='10' className='handle--custom' />
                </Brush>
            </Chart>
        </div>
    );

    const zoomFive = () => (
        <div>
            <p>
                <strong>Zoom with custom brush handle #3</strong>
            </p>

            <Chart data={chartData}
                   margin={{
                       top: 20,
                       right: 40,
                       bottom: 60,
                       left: 40,
                   }}
                   className='zoom-view__main-chart'>
                <AxisX className='zoom-view__axis'
                       scale='time'
                       timeFormat='%b %Y' />
                <Line className='zoom-view-line'
                      timeFormat='%b %Y'
                      area />
                <Brush className='zoom-view-brush' handleYPosition={height => height + 40}>
                    <circle r='10' className='handle--custom' />
                </Brush>
            </Chart>
        </div>
    );

    return (
        <div>
            {zoomOne()}
            {zoomTwo()}
            {zoomThree()}
            {zoomFour()}
            {zoomFive()}
        </div>
    );
};

export default ZoomView;
