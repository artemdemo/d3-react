import React, { Component } from 'react';

import { Chart } from '../d3-chart/components/Chart/Chart';
import { Dots } from '../d3-chart/components/Dots/Dots';
import { AxisX } from '../d3-chart/components/Axis/AxisX';
import { AxisY } from '../d3-chart/components/Axis/AxisY';

import './DotsView.less';

export class DotsView extends Component {
    render() {
        const mainData = [
            ['Date', 'Sales'],
            ['Jan 2000', 1394.46],
            ['Feb 2000', 1366.42],
            ['Mar 2000', 1498.58],
            ['Apr 2000', 1452.43],
            ['May 2000', 1420.6],
            ['Jun 2000', 1454.6],
            ['Jul 2000', 1430.83],
            ['Aug 2000', 1517.68],
            ['Sep 2000', 1436.51],
            ['Oct 2000', 1429.4],
            ['Nov 2000', 1314.95],
            ['Dec 2000', 1320.28],
            ['Jan 2001', 1366.01],
            ['Feb 2001', 1239.94],
            ['Mar 2001', 1160.33],
            ['Apr 2001', 1249.46],
            ['May 2001', 1255.82],
            ['Jun 2001', 1224.38],
            ['Jul 2001', 1211.23],
            ['Aug 2001', 1133.58],
            ['Sep 2001', 1040.94],
            ['Oct 2001', 1059.78],
            ['Nov 2001', 1139.45],
            ['Dec 2001', 1148.08],
            ['Jan 2002', 1130.2],
            ['Feb 2002', 1106.73],
            ['Mar 2002', 1147.39],
            ['Apr 2002', 1076.92],
            ['May 2002', 1067.14],
            ['Jun 2002', 989.82],
            ['Jul 2002', 911.62],
            ['Aug 2002', 916.07],
            ['Sep 2002', 815.28],
            ['Oct 2002', 885.76],
            ['Nov 2002', 936.31],
            ['Dec 2002', 879.82],
            ['Jan 2003', 855.7],
            ['Feb 2003', 841.15],
            ['Mar 2003', 848.18],
            ['Apr 2003', 916.92],
            ['May 2003', 963.59],
            ['Jun 2003', 974.5],
            ['Jul 2003', 990.31],
            ['Aug 2003', 1008.01],
            ['Sep 2003', 995.97],
            ['Oct 2003', 1050.71],
            ['Nov 2003', 1058.2],
            ['Dec 2003', 1111.92],
            ['Jan 2004', 1131.13],
            ['Feb 2004', 1144.94],
            ['Mar 2004', 1126.21],
            ['Apr 2004', 1107.3],
            ['May 2004', 1120.68],
            ['Jun 2004', 1140.84],
            ['Jul 2004', 1101.72],
            ['Aug 2004', 1104.24],
            ['Sep 2004', 1114.58],
            ['Oct 2004', 1130.2],
            ['Nov 2004', 1173.82],
            ['Dec 2004', 1211.92],
            ['Jan 2005', 1181.27],
            ['Feb 2005', 1203.6],
            ['Mar 2005', 1180.59],
            ['Apr 2005', 1156.85],
            ['May 2005', 1191.5],
            ['Jun 2005', 1191.33],
            ['Jul 2005', 1234.18],
            ['Aug 2005', 1220.33],
            ['Sep 2005', 1228.81],
            ['Oct 2005', 1207.01],
            ['Nov 2005', 1249.48],
            ['Dec 2005', 1248.29],
            ['Jan 2006', 1280.08],
            ['Feb 2006', 1280.66],
            ['Mar 2006', 1294.87],
            ['Apr 2006', 1310.61],
            ['May 2006', 1270.09],
            ['Jun 2006', 1270.2],
            ['Jul 2006', 1276.66],
            ['Aug 2006', 1303.82],
            ['Sep 2006', 1335.85],
            ['Oct 2006', 1377.94],
            ['Nov 2006', 1400.63],
            ['Dec 2006', 1418.3],
            ['Jan 2007', 1438.24],
            ['Feb 2007', 1406.82],
            ['Mar 2007', 1420.86],
            ['Apr 2007', 1482.37],
            ['May 2007', 1530.62],
            ['Jun 2007', 1503.35],
            ['Jul 2007', 1455.27],
            ['Aug 2007', 1473.99],
            ['Sep 2007', 1526.75],
            ['Oct 2007', 1549.38],
            ['Nov 2007', 1481.14],
            ['Dec 2007', 1468.36],
            ['Jan 2008', 1378.55],
            ['Feb 2008', 1330.63],
            ['Mar 2008', 1322.7],
            ['Apr 2008', 1385.59],
            ['May 2008', 1400.38],
            ['Jun 2008', 1280],
            ['Jul 2008', 1267.38],
            ['Aug 2008', 1282.83],
            ['Sep 2008', 1166.36],
            ['Oct 2008', 968.75],
            ['Nov 2008', 896.24],
            ['Dec 2008', 903.25],
            ['Jan 2009', 825.88],
            ['Feb 2009', 735.09],
            ['Mar 2009', 797.87],
            ['Apr 2009', 872.81],
            ['May 2009', 919.14],
            ['Jun 2009', 919.32],
            ['Jul 2009', 987.48],
            ['Aug 2009', 1020.62],
            ['Sep 2009', 1057.08],
            ['Oct 2009', 1036.19],
            ['Nov 2009', 1095.63],
            ['Dec 2009', 1115.1],
            ['Jan 2010', 1073.87],
            ['Feb 2010', 1104.49],
            ['Mar 2010', 1140.45],
        ];

        return (
            <div>
                <Chart data={mainData}
                       className='dots-chart'
                       width='100%'
                       height='500'>
                    <Dots timeFormat='%b %Y' />
                    <AxisX title={mainData[0][0]} scale='time' timeFormat='%b %Y' />
                    <AxisY title={mainData[0][1]} scale='linear' />
                </Chart>
            </div>
        );
    }
}