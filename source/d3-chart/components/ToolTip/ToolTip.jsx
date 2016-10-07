import React, { Component } from 'react';
import { mouse as d3_mouse } from 'd3-selection';

export class ToolTip extends Component {
    mouseMoveHandler(e) {
        console.log(e.sourceEvent);
        console.log(d3_mouse(e.target));
    }

    render() {
        const { $$width, $$height } = this.props;
        return (
            <g>
                <rect fill='transparent'
                      x='0' y='0'
                      width={$$width}
                      height={$$height}
                      onMouseMove={(e) => this.mouseMoveHandler(e)} />
            </g>
        );
    }
}

ToolTip.propTypes = {
};
