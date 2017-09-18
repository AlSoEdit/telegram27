'use strict';

import { SET_RESPONSE_TEXT, CLEAR_RESPONSE_TEXT } from '../actions/response-text';

export default function (state = { text: '' }, action) {
    switch (action.type) {
    case SET_RESPONSE_TEXT:
        return action.payload;
    case CLEAR_RESPONSE_TEXT:
        return { text: '', isError: false };
    default:
        return state;
    }
}