import React from 'react';

export const marginShape = React.PropTypes.shape({
    top: React.PropTypes.number,
    right: React.PropTypes.number,
    bottom: React.PropTypes.number,
    left: React.PropTypes.number,
});

export const deltaShape = React.PropTypes.shape({
    x: React.PropTypes.number,
    y: React.PropTypes.number,
});
