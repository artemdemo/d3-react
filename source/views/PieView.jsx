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
                       width='100%'
                       height='500'>
                    <Legend className='pie-view-legend'
                            margin={{right: 0}}
                            data={mainDataLabels} />
                    <Pie className='pie-view-pie'
                         margin={{right: 50}} />
                </Chart>

                <Chart data={mainData}
                       width='100%'
                       height='400'>
                    <Pie className='pie-view-pie'
                         innerRadius={(outerRadius) => {
                             return outerRadius * 0.7;
                         }} />
                </Chart>

                <Chart data={mainData}
                       width='100%'
                       height='400'>
                    <Pie className='pie-view-pie'
                         innerRadius={() => 50} />
                </Chart>

                <Chart data={simpleLabels}
                       width='100%'
                       height='500'>
                    <Pie className='pie-view-pie'
                         labelPadding={50}
                         hoverIndent={0}
                         margin={{left: 0}} />
                </Chart>
            </div>
        );
    }
}
