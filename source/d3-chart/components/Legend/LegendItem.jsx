import React, { Component } from 'react';
import classnames from 'classnames';

export class LegendItem extends Component {
    render() {
        const {
            text = '',
            className = 'chart-legend-item',
            transform = '',
            rectWidth = 10,
            indexName = '',
        } = this.props;

        const rectClass = classnames({
            [`${className}__rect`]: true,
            [`${className}__rect_${indexName}`]: indexName !== '',
        });

        return (
            <g transform={transform}>
                <rect className={rectClass}
                      width={rectWidth}
                      height={rectWidth}
                      cx='0' cy='0' />
                <text className={`${className}__text`} x={rectWidth + 5} y={rectWidth} >
                    {text}
                </text>
            </g>
        );
    }
}

LegendItem.propTypes = {
    transform: React.PropTypes.string,
    className: React.PropTypes.string,
    indexName: React.PropTypes.string,
    text: React.PropTypes.string,
    rectWidth: React.PropTypes.number,
};
