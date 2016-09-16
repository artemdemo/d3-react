import React, { Component } from 'react';
import { select as d3_select } from 'd3-selection';


export class Chart extends Component {
    render() {
        return (
            <div className='bars-chart'>
                <svg ref='chartSVG' width='960' height='500'>
                    {this.props.children}
                </svg>
            </div>
        )
    }
}
