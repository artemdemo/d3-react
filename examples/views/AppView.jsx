import React from 'react';
import { Link } from 'react-router';

import './AppView.less';

const AppView = (props) => {
    return (
        <div className='container'>
            <div className='menu'>
                <div className='row'>
                    <div className='col-sm-4'>
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
                            <li><Link to='/tooltip'>Tooltip</Link></li>
                        </ul>
                    </div>
                    <div className='col-sm-4'>
                        <p>
                            Combined charts
                        </p>
                        <ul>
                            <li><Link to='/combined/lines-areas'>Lines + Areas + Grid + Legend</Link></li>
                        </ul>
                        <p>
                            Interactive charts
                        </p>
                        <ul>
                            <li><Link to='/interactive/zoom'>Zoom (brush)</Link></li>
                        </ul>
                    </div>
                    <div className='col-sm-4'>
                        <p>
                            Other
                        </p>
                        <ul>
                            <li><Link to='/other/gradient'>Gradients (black)</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <hr />

            {props.children}
        </div>
    );
};

export default AppView;
