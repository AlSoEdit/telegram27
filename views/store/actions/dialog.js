'use strict';

export const UPDATE_DIALOG = 'UPDATE_DIALOG';
export function updateDialog(dialog) {
    return {
        type: UPDATE_DIALOG,
        payload: dialog
    };
}

export const SET_DIALOGS = 'SET_DIALOGS';
export function setDialogs(dialogs) {
    return {
        type: SET_DIALOGS,
        payload: dialogs
    };
}

export const ADD_MESSAGE = 'ADD_MESSAGE';
export function addMessage(dialogId, message) {
    return {
        type: ADD_MESSAGE,
        payload: {
            dialogId,
            message
        }
    };
}

export const ADD_FRIEND = 'ADD_FRIEND';
export function addFriend(login) {
    return {
        type: ADD_FRIEND,
        payload: login
    };
}
