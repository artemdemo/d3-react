import React, { Component } from 'react';

import { Bars } from '../components/Bars/Bars';

export class MainView extends Component {
    render() {
        const bars = [
            ['Year', 'Sales'],
            ['2011', 300],
            ['2012', 180],
            ['2013', 510],
            ['2014', 400],
            ['2015', 1170],
            ['2016', 660],
            ['2017', 1030]
        ];
        return (
            <div className='container'>
                Charts
                <ul>
                    <li>
                        Bars
                    </li>
                </ul>

                <Bars data={bars} />
            </div>
        );
    }
}
