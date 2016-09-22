import React, { Component } from 'react';

import './Legend.less';

export class Legend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titles: [],
        }
    }

    componentDidMount() {
        const { $$data } = this.props;

        this.setState({
            titles: $$data[0].slice(1),
        });
    }

    render() {
        const { $$height } = this.props;
        return (
            <g className='chart-legend'
               transform={`translate(0, ${$$height + 30})`}>
                {this.state.titles.map((title, index) => (
                    <text transform={`translate(${50 * index}, 0)`}
                          key={`title-${index}`}>{title}</text>
                ))}
            </g>
        );
    }
}
