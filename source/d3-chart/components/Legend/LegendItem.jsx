import React, { Component } from 'react';
import classnames from 'classnames';

const DEFAULT_BASE_CLASS = 'chart-legend-item';

export const LegendItem = function(props) {
    const {
        text = '',
        className = DEFAULT_BASE_CLASS,
        transform = '',
        rectWidth = 10,
        indexName = '',
    } = props;

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
};

LegendItem.propTypes = {
    transform: React.PropTypes.string,
    className: React.PropTypes.string,
    indexName: React.PropTypes.string,
    text: React.PropTypes.string,
    rectWidth: React.PropTypes.number,
};
