'use strict';

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers/';

const middlewares = [thunk];

if (process.env.NODE_ENV === 'production') {
    middlewares.push(createLogger());
}

export default createStore(
    reducers,
    applyMiddleware(...middlewares)
);
