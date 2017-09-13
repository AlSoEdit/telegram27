'use strict';

import es6 from 'es6-promise';
es6.polyfill();
import fetch from 'isomorphic-fetch';

import { canNotConnectToServer } from '../../../constants/errors';
import { fetchOptions } from '../../../constants/routes';
import { setError, clearError } from './error';
import { setUser } from './user';

export const WS_ON_OPEN = 'WS_ON_OPEN';
export function wsOnOpen() {
    return {
        type: WS_ON_OPEN
    };
}

export const WS_ON_CLOSE = 'WS_ON_CLOSE';
export function wsOnClose() {
    return {
        type: WS_ON_CLOSE
    };
}

export function wsOnMessage(event) {
    const data = JSON.parse(event.data);
    const { type, payload } = data;

    return {
        type,
        payload
    };
}

export function wsSendMessage(socket, clientAction, { type, payload }) {
    return (dispatch, getState) => {
        const { wsConnected } = getState();

        if (wsConnected) {
            socket.send(JSON.stringify({ type, payload }));

            if (clientAction) {
                dispatch(clientAction({ ...payload }));
            }
        } else {
            dispatch(setError(canNotConnectToServer));
        }
    };
}

export function makeRequest({ url, method, inputValues = [], additionalAction = null }) {
    return async function (dispatch) {
        dispatch(clearError());

        const body = ['head', 'get'].includes(method) ? null : JSON.stringify(inputValues);
        const options = { body, ...fetchOptions, method };

        const res = await fetch(url, options);
        const answer = await res.json();
        const { user, text } = answer;

        dispatch(setUser(user));

        if (text) {
            dispatch(setError(text));
        }

        if (additionalAction) {
            dispatch(additionalAction(answer.data));
        }
    };
}
