import React, { Component } from 'react';

import { Chart } from '../d3-chart/components/Chart/Chart';
import { Pie } from '../d3-chart/components/Pie/Pie';
import { Legend } from '../d3-chart/components/Legend/Legend';

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

        const mainDataLabels = ['Books', 'Displays', 'Laptops', 'Motorcycles'];

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
                    <Legend className='pie-chart-legend'
                            margin={{right: 0}}
                            data={mainDataLabels} />
                    <Pie margin={{right: 100}} />
                </Chart>

                <Chart data={mainData}
                       className='pie-chart'
                       width='100%'
                       height='400'>
                    <Pie innerRadius={(outerRadius) => {
                        return outerRadius * 0.7;
                    }} />
                </Chart>

                <Chart data={mainData}
                       className='pie-chart'
                       width='100%'
                       height='400'>
                    <Pie innerRadius={() => 50} />
                </Chart>

                <Chart data={simpleLabels}
                       className='pie-chart'
                       width='100%'
                       height='500'>
                    <Pie labelPadding={50}
                         margin={{left: 0}} />
                </Chart>
            </div>
        );
    }
}
