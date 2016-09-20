import React, { Component } from 'react';
import { Link } from 'react-router';

export class AppView extends Component {
    render() {
        return (
            <div className='container'>
                <p>
                    Single charts
                </p>
                <ul>
                    <li>
                        <Link to='/columns'>Columns</Link>
                    </li>
                    <li>
                        <Link to='/bars'>Bars</Link>
                    </li>
                    <li>
                        <Link to='/lines'>Lines</Link>
                    </li>
                </ul>
                <p>
                    Combined charts
                </p>

                {this.props.children}
            </div>
        );
    }
}
