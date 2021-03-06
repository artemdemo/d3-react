import React from 'react';
import PropTypes from 'prop-types';
import nerve from '../../services/nerve';

class Rectangle extends React.Component {
    constructor(props) {
        super(props);

        const { connectId } = props;
        if (connectId) {
            nerve.on({
                route: `${connectId}/update-brush`,
                callback: s => this.updateRectangle(s),
            });
        }

        this.state = {
            left: 0,
            width: 0,
        };
    }

    componentDidMount() {
        const { $$width } = this.props;
        this.setState({
            width: $$width,
        });
    }

    updateRectangle(s) {
        this.setState({
            left: s[0],
            width: s[1] - s[0],
        });
    }

    render() {
        const { $$height, $$width, className = '', invert = false } = this.props;
        if (invert) {
            const left = this.state.left + this.state.width;
            return (
                <g>
                    <rect className={className} x='0' y='0' width={this.state.left} height={$$height} />
                    <rect className={className}
                          x={left} y='0'
                          width={$$width - left}
                          height={$$height} />
                </g>
            );
        }
        return (
            <rect className={className} x={this.state.left} y='0' width={this.state.width} height={$$height} />
        );
    }
}

Rectangle.propTypes = {
    connectId: PropTypes.string,
    className: PropTypes.string,
    invert: PropTypes.bool,
};

export default Rectangle;
