import React, { Component } from 'react';

export class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };

        this.margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 40,
        };
    }

    componentDidMount() {
        const svgDimensions = this.chartSVG.getBoundingClientRect();
        const width = svgDimensions.width - this.margin.left - this.margin.right;
        const height = svgDimensions.height - this.margin.top - this.margin.bottom;

        this.setState({
            width,
            height,
        });
    }

    render() {
        const { width = '100%', height, className } = this.props;
        let children = null;

        if (this.state.width && this.state.height) {
            const { data } = this.props;
            children = React.Children.map(
                this.props.children,
                child => {
                    return React.cloneElement(child, {
                        $$data: data,
                        $$width: this.state.width,
                        $$height: this.state.height,
                    });
                });
        }

        return (
            <svg ref={(el) => this.chartSVG = el}
                 className={className}
                 width={width}
                 height={height} >
                <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
                    {children}
                </g>
            </svg>
        );
    }
}

Chart.propTypes = {
    data: React.PropTypes.any.isRequired,
    className: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
};
