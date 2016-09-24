import React, { Component } from 'react';
import { arc as d3_arc, pie as d3_pie} from 'd3-shape';
import { min as d3_min } from 'd3-array';
import { select as d3_select } from 'd3-selection';
import { marginShape } from '../../propTypes';
import { linefyName } from '../../services/utils';
import { getClassesScale } from '../../services/scales';

/**
 * Pie chart
 *
 * @tutorial http://cagrimmett.com/til/2016/08/19/d3-pie-chart.html
 */

export class Pie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            marginLeft: 0,
            marginTop: 0,
        };
    }
    componentDidMount() {
        this.createPie(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createPie(nextProps);
    }

    createPie(props) {
        const { $$width, $$height, $$data, data, outerRadius, innerRadius, labelPadding, margin = {} } = props;
        let calculatedOuterRadius =  outerRadius ? outerRadius : d3_min([$$width / 2, $$height / 2]);
        const selectedData = data || $$data;
        const internalData = selectedData.filter((item, index) => index !== 0);

        let marginLeft;
        if (margin.right !== undefined) {
            marginLeft = $$width - calculatedOuterRadius - margin.right;
        } else if (margin.left !== undefined) {
            marginLeft = calculatedOuterRadius + margin.left;
        } else {
            marginLeft = $$width / 2;
        }

        if (marginLeft < calculatedOuterRadius) {
            calculatedOuterRadius = marginLeft;
        }

        let marginTop;
        if (margin.bottom !== undefined) {
            marginTop = $$width - calculatedOuterRadius - margin.bottom;
        } else if (margin.top !== undefined) {
            marginTop = calculatedOuterRadius + margin.top;
        } else {
            marginTop = $$height / 2;
        }

        this.setState({
            marginLeft,
            marginTop,
        });

        let calculatedInnerRadius = 0;
        if (innerRadius) {
            calculatedInnerRadius = innerRadius(calculatedOuterRadius);
        }

        const pieData = d3_pie()
            .value(d => d[1])(internalData);

        const arcData = d3_arc()
            .outerRadius(calculatedOuterRadius)
            .innerRadius(calculatedInnerRadius);

        let labelArcData;

        if (labelPadding < calculatedOuterRadius && labelPadding > calculatedInnerRadius) {
            labelArcData = d3_arc()
                .outerRadius(calculatedOuterRadius - labelPadding)
                .innerRadius(calculatedOuterRadius - labelPadding);
        }

        const groupClassesScale = getClassesScale(internalData.map(item => `pie-arc__section_${linefyName(item[0])}`));

        this.pieGroup.innerHTML = '';

        const setcionGroup = d3_select(this.pieGroup)
            .selectAll('pie-arc')
            .data(pieData)
            .enter().append('g');

        setcionGroup.attr('class', 'pie-arc')
            .append('path')
            .attr('d', arcData)
            .attr('class', d => `pie-arc__section ${groupClassesScale(d.data[0])}`);

        if (labelArcData) {
            setcionGroup.append('text')
                .attr('transform', d => `translate(${labelArcData.centroid(d)})`)
                .text(d => d.data[0])
                .attr('class', 'pie-arc__text');
        }
    }

    render() {
        return (
            <g ref={el => this.pieGroup = el}
               transform={`translate(${this.state.marginLeft}, ${this.state.marginTop})`} />
        );
    }
}

Pie.propTypes = {
    data: React.PropTypes.array,
    className: React.PropTypes.number,
    outerRadius: React.PropTypes.number,
    innerRadius: React.PropTypes.func,
    labelPadding: React.PropTypes.number,
    margin: marginShape,
};

