import React, { Component } from 'react';
import throttle from 'lodash.throttle';
import { marginShape, deltaShape } from '../../propTypes';

/**
 * Parent component for all charts
 */
export default class Chart extends Component {
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
        const { minResizeWidth = 0 } = this.props;
        const svgDimensions = this.chartSVG.getBoundingClientRect();
        const height = svgDimensions.height - this.margin.top - this.margin.bottom;
        const minWidth = svgDimensions.width > minResizeWidth ? svgDimensions.width : minResizeWidth;
        const width = minWidth - this.margin.left - this.margin.right;
        this.setState({
            containerWidth: minWidth,
            containerHeight: svgDimensions.height,
            width,
            height,
        });
    }

    render() {
        const { className, dataDelta } = this.props;
        let children = null;

        if (this.state.width && this.state.height) {
            const { data } = this.props;
            children = React.Children.map(
                this.props.children,
                (child) => {
                    const newProps = {
                        $$width: this.state.width,
                        $$height: this.state.height,
                    };
                    if (data) {
                        newProps.$$data = data;
                    }
                    if (dataDelta) {
                        newProps.$$dataDelta = dataDelta;
                    }
                    return React.cloneElement(child, newProps);
                });
        }

        return (
            <svg ref={el => this.chartSVG = el}
                 className={className}
                 preserveAspectRatio='xMidYMid'
                 viewBox={`0, 0, ${this.state.containerWidth}, ${this.state.containerHeight}`}
                 width='100%' >
                <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
                    {children}
                </g>
            </svg>
        );
    }
}

Chart.propTypes = {
    /**
     * Main data object of the component.
     * I'm using similar data structure to Google charts, for example:
     * ```
     * const data = [
     *     ['Year', 'Sales', 'Revenue'],
     *     ['2011', 300, 100],
     *     ['2012', 180, 10],
     *     ['2013', 510, 230],
     *     ['2014', 400, 100],
     *     ['2015', 1170, 700],
     *     ['2016', 660, 210],
     *     ['2017', 1030, 500]
     *  ];
     * ```
     */
    data: React.PropTypes.any,
    /**
     * Delta change for maximum data value.
     * Value is in percents.
     */
    dataDelta: deltaShape,
    /**
     * Minimum width under which component will stop listen to window resize.
     * After that component will be responsive like simple vector image.
     */
    minResizeWidth: React.PropTypes.number,
    /**
     * Inner graph margin
     */
    margin: marginShape,
    /**
     * Component class property for CSS
     */
    className: React.PropTypes.string,
};
