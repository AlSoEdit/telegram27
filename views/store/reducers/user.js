'use strict';

import { SET_USER } from '../actions/user';

export default function (state = null, action) {
    switch (action.type) {
    case SET_USER:
        return action.payload === null ? null : Object.assign({}, state, action.payload);
    default:
        return state;
    }
}