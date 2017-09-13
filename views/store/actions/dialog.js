'use strict';

const UPDATE_DIALOG = 'UPDATE_DIALOG';
function updateDialog(dialog) {
    return {
        type: UPDATE_DIALOG,
        payload: dialog
    };
}

const SET_DIALOGS = 'SET_DIALOGS';
function setDialogs(dialogs) {
    return {
        type: SET_DIALOGS,
        payload: dialogs
    };
}

const ADD_MESSAGE = 'ADD_MESSAGE';
function addMessage({ dialogId, message }) {
    return {
        type: ADD_MESSAGE,
        payload: {
            dialogId,
            message
        }
    };
}

const ADD_FRIEND = 'ADD_FRIEND';
function addFriend(login) {
    return {
        type: ADD_FRIEND,
        payload: login
    };
}

module.exports = {
    ADD_MESSAGE, addMessage,
    ADD_FRIEND, addFriend,
    SET_DIALOGS, setDialogs,
    UPDATE_DIALOG, updateDialog
};
