'use strict';

import { UPDATE_DIALOG, ADD_MESSAGE, SET_DIALOGS } from '../actions/dialog';

export default function (state = [], action) {
    switch (action.type) {
    case UPDATE_DIALOG:
        return state.map(d =>
            d.id === action.payload.id
                ? action.payload
                : d
        );
    case ADD_MESSAGE:
        return state.map(d =>
            d.id === action.payload.dialogId
                ? Object.assign({}, d, { messages : [...d.messages, action.payload.message] })
                : d
        );
    case SET_DIALOGS:
        return action.payload;
    default:
        return state;
    }
}