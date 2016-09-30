import React, { Component } from 'react';
import { Link } from 'react-router';

import './AppView.less';

export class AppView extends Component {
    render() {
        return (
            <div className='container'>
                <div className='menu'>
                    <p>
                        Single charts
                    </p>
                    <ul>
                        <li><Link to='/columns'>Columns</Link></li>
                        <li><Link to='/bars'>Bars</Link></li>
                        <li><Link to='/lines'>Lines</Link></li>
                        <li><Link to='/legend'>Legend</Link></li>
                        <li><Link to='/dots'>Dots</Link></li>
                        <li><Link to='/pie'>Pie</Link></li>
                    </ul>
                    <p>
                        Combined charts
                    </p>
                    <ul>
                        <li><Link to='/combined/lines-areas'>Lines + Areas + Grid + Legend</Link></li>
                    </ul>
                    <p>
                        Other
                    </p>
                    <ul>
                        <li><Link to='/other/gradient'>Gradients</Link></li>
                    </ul>
                </div>

                <hr />

                {this.props.children}
            </div>
        );
    }
}
