import React from 'react';

/**
 * Mock file for basic functionality of the <Chart />
 */
const ChartMock = (props) => {
    let children;
    try {
        children = React.Children.map(
            props.children,
            (child) => {
                const newProps = {
                    $$width: 500,
                    $$height: 300,
                };
                return React.cloneElement(child, newProps);
            });
    } catch (e) {
        console.log(e);
    }
    return (
        <svg className='chart-mock'>
            {children}
        </svg>
    );
};

export default ChartMock;
