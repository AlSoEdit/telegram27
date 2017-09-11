'use strict';

import { SET_ERROR, CLEAR_ERROR } from '../actions/error';

export default function (state = '', action) {
    switch (action.type) {
    case SET_ERROR:
        return action.payload;
    case CLEAR_ERROR:
        return '';
    default:
        return state;
    }
}