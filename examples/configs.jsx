import { routerReducer } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';

import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

const reducers = combineReducers({
    routing: routerReducer,
});

export const store = createStore(reducers, applyMiddleware());

export const history = syncHistoryWithStore(browserHistory, store);
