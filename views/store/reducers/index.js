'use strict';

import { combineReducers } from 'redux';
import user from './user';
import error from './error';
import dialogs from './dialog';

export default combineReducers({
    user,
    errorText: error,
    dialogs
});
