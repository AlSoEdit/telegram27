'use strict';

const SET_RESPONSE_TEXT = 'SET_RESPONSE_TEXT';
function setResponseText({ text, isError }) {
    return {
        type: SET_RESPONSE_TEXT,
        payload: {
            text,
            isError
        }
    };
}

const CLEAR_RESPONSE_TEXT = 'CLEAR_RESPONSE_TEXT';
function clearResponseText() {
    return {
        type: CLEAR_RESPONSE_TEXT
    };
}

module.exports = {
    setResponseText, SET_RESPONSE_TEXT,
    clearResponseText, CLEAR_RESPONSE_TEXT
};
