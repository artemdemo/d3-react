import React, { Component } from 'react';
import { Link } from 'react-router';

export class AppView extends Component {
    render() {
        return (
            <div className='container'>
                Charts
                <ul>
                    <li>
                        <Link to='/columns'>Columns</Link>
                    </li>
                    <li>
                        <Link to='/bars'>Bars</Link>
                    </li>
                </ul>

                {this.props.children}
            </div>
        );
    }
}
