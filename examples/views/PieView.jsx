import React from 'react';

import Chart from '../../source/components/Chart/Chart';
import Pie from '../../source/components/Pie/Pie';
import Legend from '../../source/components/Legend/Legend';

import './PieView.less';

const PieView = () => {
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
                   className='pie-view-chart'>
                <Legend className='pie-view-legend'
                        margin={{right: 0}}
                        data={mainDataLabels} />
                <Pie className='pie-view-pie'
                     margin={{right: 50}} />
            </Chart>

            <Chart data={mainData}
                   className='pie-view-chart-donut'>
                <Pie className='pie-view-pie'
                     innerRadius={(outerRadius) => {
                         return outerRadius * 0.7;
                     }} />
            </Chart>

            <Chart data={mainData}
                   className='pie-view-chart pie-view-chart_donut'>
                <Pie className='pie-view-pie'
                     innerRadius={() => 50} />
            </Chart>

            <Chart data={simpleLabels}
                   className='pie-view-chart'>
                <Pie className='pie-view-pie'
                     labelPadding={50}
                     hoverIndent={0}
                     margin={{left: 0}} />
            </Chart>
        </div>
    );
}

export default PieView;
