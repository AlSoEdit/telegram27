'use strict';

const es6 = require('es6-promise');
es6.polyfill();
const fetch = require('isomorphic-fetch');
const { OK } = require('http-status-codes');

const { canNotConnectToServer } = require('../../../constants/errors');
const { fetchOptions } = require('../../../constants/routes');
const { setResponseText, clearResponseText } = require('./response-text');
const { setUser } = require('./user');

const WS_ON_OPEN = 'WS_ON_OPEN';
function wsOnOpen() {
    return {
        type: WS_ON_OPEN
    };
}

const WS_ON_CLOSE = 'WS_ON_CLOSE';
function wsOnClose() {
    return {
        type: WS_ON_CLOSE
    };
}

function wsOnMessage(event) {
    const data = JSON.parse(event.data);
    const { type, payload } = data;

    return {
        type,
        payload
    };
}

function wsSendMessage(socket, clientAction, { type, payload }) {
    return (dispatch, getState) => {
        const { wsConnected } = getState();

        if (wsConnected) {
            socket.send(JSON.stringify({ type, payload }));

            if (clientAction) {
                dispatch(clientAction({ ...payload }));
            }
        } else {
            dispatch(setResponseText({ text: canNotConnectToServer, isError: true }));
        }
    };
}

function makeRequest({ url, method, inputValues = [], additionalAction = null }) {
    return async dispatch => {
        dispatch(clearResponseText());

        const body = ['head', 'get'].includes(method) ? null : JSON.stringify(inputValues);
        const options = {body, ...fetchOptions, method};

        const res = await fetch(url, options);
        const answer = await res.json();
        const {user, text} = answer;

        dispatch(setUser(user));

        if (text) {
            dispatch(setResponseText({
                text,
                isError: res.status !== OK
            }));

            setTimeout(() => dispatch(clearResponseText()), 5 * 1000);
        }

        if (res.status === OK && additionalAction) {
            const action = additionalAction(answer.data);

            if (action && action.type) {
                dispatch(action);
            }
        }
    };
}

module.exports = {
    makeRequest,
    wsSendMessage,
    wsOnOpen, WS_ON_OPEN,
    wsOnMessage,
    wsOnClose, WS_ON_CLOSE
};
