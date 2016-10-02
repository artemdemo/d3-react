import React, { Component } from 'react';
import { marginShape } from '../../propTypes';
import { linefyName } from '../../services/utils';
import { LegendItem } from './LegendItem';

const DEFAULT_BASE_CLASS = 'chart-legend';

export class Legend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titles: [],
        };
    }

    componentDidMount() {
        const { $$data, data } = this.props;

        this.setState({
            titles: data ? data : $$data[0].slice(1),
        });
    }

    render() {
        const {
            $$height,
            $$width,
            margin = {},
            itemWidth = 50,
            itemHeight = 20,
            className = DEFAULT_BASE_CLASS,
            orientation = 'vertical',
        } = this.props;

        let marginTop = 0;
        if (margin.bottom !== undefined) {
            marginTop = $$height - margin.bottom;
            marginTop -= orientation === 'vertical' ? itemHeight * this.state.titles.length : itemHeight;
        } else if (margin.top !== undefined) {
            marginTop = margin.top;
        }

        let marginLeft = 0;
        if (margin.right !== undefined) {
            marginLeft = $$width - margin.right;
            marginLeft -= orientation === 'horizontal' ? itemWidth * this.state.titles.length : itemWidth;
        } else if (margin.left !== undefined) {
            marginLeft = margin.left;
        }

        return (
            <g className={className}
               transform={`translate(${marginLeft}, ${marginTop})`}>
                {this.state.titles.map((title, index) => (
                    <LegendItem text={title}
                                className={`${className}-item`}
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
    data: React.PropTypes.array,
    itemWidth: React.PropTypes.number,
    itemHeight: React.PropTypes.number,
    margin: marginShape,
    className: React.PropTypes.string,
    orientation: React.PropTypes.oneOf(['horizontal', 'vertical']),
};
