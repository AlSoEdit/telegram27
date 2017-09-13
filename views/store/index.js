'use strict';

import { applyMiddleware, createStore } from 'redux';
// import config from 'config';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers/';

const middlewares = [thunk, createLogger()];

// if (config.util.getEnv('NODE_ENV') === 'production') {
//     middlewares.push(createLogger());
// }

export default createStore(
    reducers,
    applyMiddleware(...middlewares)
);
