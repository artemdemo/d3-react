import React from 'react';
import PropTypes from 'prop-types';

const ToolTipLine = (props) => {
    const { item, height, className, dotRadius = 3 } = props;
    const style = {
        display: item.visible ? 'initial' : 'none',
    };

    const renderDot = () => {
        if (dotRadius === 0) {
            return null;
        }
        return (
            <circle cx={item.x}
                    cy={item.y}
                    r={dotRadius}
                    className={`${className}__dot`}
                    style={style} />
        );
    };

    return (
        <g>
            <line x1={item.x} y1='0' x2={item.x} y2={height}
                  style={style}
                  className={`${className}__line`}
                  stroke='black' />
            {renderDot()}
        </g>
    );
};

ToolTipLine.propTypes = {
    item: PropTypes.shape({
        visible: PropTypes.bool,
        x: PropTypes.number,
        y: PropTypes.number,
    }),
    className: PropTypes.string,
    height: PropTypes.number,
    dotRadius: PropTypes.number,
};

export default ToolTipLine;
