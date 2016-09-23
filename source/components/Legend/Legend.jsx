import React, { Component } from 'react';
import { linefyName } from '../../services/utils';
import { LegendItem } from './LegendItem';

import './Legend.less';

export class Legend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titles: [],
        };
    }

    componentDidMount() {
        const { $$data } = this.props;

        this.setState({
            titles: $$data[0].slice(1),
        });
    }

    render() {
        const { $$height, itemWidth = 50, marginTop = 0, className = 'chart-legend' } = this.props;
        return (
            <g className={className}
               transform={`translate(0, ${$$height + marginTop})`}>
                {this.state.titles.map((title, index) => (
                    <LegendItem text={title}
                                className={className}
                                indexName={linefyName(title)}
                                transform={`translate(${itemWidth * index}, 0)`}
                                key={`title-${index}`} />
                ))}
            </g>
        );
    }
}

Legend.propTypes = {
    itemWidth: React.PropTypes.number,
    marginTop: React.PropTypes.number,
    className: React.PropTypes.string,
};
