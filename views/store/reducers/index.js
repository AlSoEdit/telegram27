'use strict';

import { combineReducers } from 'redux';
import user from './user';
import responseText from './response-text';
import dialogs from './dialog';
import request from './request';

export default combineReducers({
    user,
    responseText,
    dialogs,
    wsConnected: request
});
