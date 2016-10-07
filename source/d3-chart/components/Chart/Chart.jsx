import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import { marginShape } from '../../propTypes';

const DEFAULT_BASE_CLASS = 'chart-container';

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
        window.removeEventListener('resize', this.windowResizehandler);
    }

    updateChartDimensions() {
        const { minResizeWidth } = this.props;
        const svgDimensions = this.chartSVG.getBoundingClientRect();

        if (minResizeWidth === undefined || this.state.containerWidth === 0 || svgDimensions.width > minResizeWidth) {
            const width = svgDimensions.width - this.margin.left - this.margin.right;
            const height = svgDimensions.height - this.margin.top - this.margin.bottom;
            this.setState({
                containerWidth: svgDimensions.width,
                containerHeight: svgDimensions.height,
                width,
                height,
            });
        } else if (minResizeWidth !== undefined) {
            const width = minResizeWidth - this.margin.left - this.margin.right;
            this.setState({
                containerWidth: minResizeWidth,
                width,
            });
        }
    }

    render() {
        const { width = '100%', height, className = DEFAULT_BASE_CLASS } = this.props;
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
            <div className={className} style={{position: 'relative'}}>
                <svg ref={(el) => this.chartSVG = el}
                     className={`${className}__chart`}
                     preserveAspectRatio='xMidYMid'
                     viewBox={`0, 0, ${this.state.containerWidth}, ${this.state.containerHeight}`}
                     width='100%'
                     height='100%' >
                    <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
                        {children}
                    </g>
                </svg>
                <div style={{position: 'absolute'}}></div>
            </div>
        );
    }
}

Chart.propTypes = {
    data: React.PropTypes.any,
    margin: marginShape,
    minResizeWidth: React.PropTypes.number,
    className: React.PropTypes.string,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
};
