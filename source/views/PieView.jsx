import React, { Component } from 'react';

import { Chart } from '../d3-chart/components/Chart/Chart';
import { Pie } from '../d3-chart/components/Pie/Pie';

import './PieView.less';

export class PieView extends Component {
    render() {
        const mainData = [
            ['Product', 'Sales'],
            ['Books', 100],
            ['Displays', 350],
            ['Laptops', 200],
            ['Motorcycles', 50],
        ];
        const simpleLabels = [
            ['Product', 'Sales'],
            ['Label A', 230],
            ['Label B', 150],
            ['Label C', 300],
            ['Label D', 590],
        ];
        return (
            <div>
                <Chart data={mainData}
                       className='pie-chart'
                       width='100%'
                       height='500'>
                    <Pie />
                </Chart>

                <Chart data={mainData}
                       className='pie-chart'
                       width='100%'
                       height='300'>
                    <Pie margin={{left: 0}} innerRadius={() => 20} />
                </Chart>

                <Chart data={mainData}
                       className='pie-chart'
                       width='100%'
                       height='300'>
                    <Pie margin={{right: 0}} innerRadius={() => 20} />
                </Chart>

                <Chart data={simpleLabels}
                       className='pie-chart'
                       width='100%'
                       height='500'>
                    <Pie labelPadding={50} />
                </Chart>
            </div>
        );
    }
}
