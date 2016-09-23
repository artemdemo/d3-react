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
        const {
            $$height,
            $$width,
            margin,
            itemWidth = 50,
            itemHeight = 20,
            className = '',
            orientation = 'vertical',
        } = this.props;

        const updatedMargin = Object.assign({
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }, margin);

        let marginTop;
        if (updatedMargin.bottom !== 0) {
            marginTop = $$height - updatedMargin.bottom;
            marginTop -= orientation === 'vertical' ? itemHeight * this.state.titles.length : itemHeight;
        } else {
            marginTop = updatedMargin.top;
        }

        let marginLeft;
        if (updatedMargin.right !== 0) {
            marginLeft = $$width - updatedMargin.right;
            marginLeft -= orientation === 'horizontal' ? itemWidth * this.state.titles.length : itemWidth;
        } else {
            marginLeft = updatedMargin.left;
        }

        return (
            <g className={`chart-legend ${className}`}
               transform={`translate(${marginLeft}, ${marginTop})`}>
                {this.state.titles.map((title, index) => (
                    <LegendItem text={title}
                                className={className === '' ? 'chart-legend' : className}
                                indexName={linefyName(title)}
                                transform={orientation === 'vertical' ?
                                    `translate(0, ${itemHeight * index})` :
                                    `translate(${itemWidth * index}, 0)`}
                                key={`title-${index}`} />
                ))}
            </g>
        );
    }
}

Legend.propTypes = {
    itemWidth: React.PropTypes.number,
    itemHeight: React.PropTypes.number,
    margin: React.PropTypes.shape({
        top: React.PropTypes.number,
        right: React.PropTypes.number,
        bottom: React.PropTypes.number,
        left: React.PropTypes.number,
    }),
    className: React.PropTypes.string,
    orientation: React.PropTypes.oneOf(['horizontal', 'vertical']),
};
