import React, { Component } from 'react';
import { throttle } from '../../services/utils';

export class Chart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            containerWidth: 0,
            containerHeight: 0,
            width: 0,
            height: 0,
        };

        this.margin = Object.assign({
            top: 20,
            right: 20,
            bottom: 30,
            left: 40,
        }, props.margin);

        this.windowResizehandler = throttle(() => {
            this.updateChartDimensions();
        }, 20);
    }

    componentDidMount() {
        this.updateChartDimensions();
        window.addEventListener('resize', this.windowResizehandler);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.windowResizehandler)
    }

    updateChartDimensions() {
        const svgDimensions = this.chartSVG.getBoundingClientRect();
        const width = svgDimensions.width - this.margin.left - this.margin.right;
        const height = svgDimensions.height - this.margin.top - this.margin.bottom;

        this.setState({
            containerWidth: svgDimensions.width,
            containerHeight: svgDimensions.height,
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
                 preserveAspectRatio='xMidYMid'
                 viewBox={`0, 0, ${this.state.containerWidth}, ${this.state.containerHeight}`}
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
    margin: React.PropTypes.shape({
        top: React.PropTypes.number,
        right: React.PropTypes.number,
        bottom: React.PropTypes.number,
        left: React.PropTypes.number,
    }),
    className: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
};
