import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import './styles/general.less';

import { store, history } from './configs';

import { AppView } from './views/AppView';
import { MainView } from './views/MainView';
import { ColumnsView } from './views/ColumnsView';
import { BarsView } from './views/BarsView';
import { LinesView } from './views/LinesView';
import { LegendView } from './views/LegendView';
import { DotsView } from './views/DotsView';
import { PieView } from './views/PieView';
import { TooltipView } from './views/TooltipView';
import { LinesAreasView } from './views/combined/LinesAreasView';
import { GradientView } from './views/other/GradientView';
import ChartMapView from './views/interactive/ChartMapView';


render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={AppView} >
                <IndexRoute component={MainView} />
                <Route path='columns' component={ColumnsView} />
                <Route path='bars' component={BarsView} />
                <Route path='lines' component={LinesView} />
                <Route path='legend' component={LegendView} />
                <Route path='dots' component={DotsView} />
                <Route path='pie' component={PieView} />
                <Route path='tooltip' component={TooltipView} />
                <Route path='combined'>
                    <Route path='lines-areas' component={LinesAreasView} />
                </Route>
                <Route path='other'>
                    <Route path='gradient' component={GradientView} />
                </Route>
                <Route path='interactive'>
                    <Route path='chart-map' component={ChartMapView} />
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
);
