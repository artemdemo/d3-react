import PropTypes from 'prop-types';

export const marginShape = PropTypes.shape({
    top: PropTypes.number,
    right: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
});

export const deltaShape = PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
});
