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
        const { $$height, itemWidth = 50, marginTop = 0 } = this.props;
        return (
            <g className='chart-legend'
               transform={`translate(0, ${$$height + marginTop})`}>
                {this.state.titles.map((title, index) => (
                    <text transform={`translate(${itemWidth * index}, 0)`}
                          key={`title-${index}`}>{title}</text>
                ))}
            </g>
        );
    }
}

Legend.propTypes = {
    itemWidth: React.PropTypes.number,
    marginTop: React.PropTypes.number,
};
