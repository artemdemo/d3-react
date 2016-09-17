import React, { Component } from 'react';
import { select as d3_select } from 'd3-selection';

export class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            x: null,
            y: null,
            rootGroup: null,
        }
    }

    componentDidMount() {
        const svg = d3_select(this.refs.chartSVG);
        const margin = {top: 20, right: 20, bottom: 30, left: 40};
        const width = +svg.attr('width') - margin.left - margin.right;
        const height = +svg.attr('height') - margin.top - margin.bottom;

        const rootGroup = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        this.setState({
            rootGroup,
            width,
            height,
        });
    }

    render() {
        let children = null;

        if (this.state.rootGroup && this.state.width && this.state.height) {
            const { data } = this.props;
            children = React.Children.map(
                this.props.children,
                child => {
                    return React.cloneElement(child, {
                        $$data: data,
                        $$rootGroup: this.state.rootGroup,
                        $$width: this.state.width,
                        $$height: this.state.height,
                    });
                });
        }

        return (
            <div className='bars-chart'>
                <svg ref='chartSVG' width='960' height='500'>
                    {children}
                </svg>
            </div>
        )
    }
}
