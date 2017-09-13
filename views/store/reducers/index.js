'use strict';

import { combineReducers } from 'redux';
import user from './user';
import error from './error';
import dialogs from './dialog';
import request from './request';

export default combineReducers({
    user,
    errorText: error,
    dialogs,
    wsConnected: request
});
