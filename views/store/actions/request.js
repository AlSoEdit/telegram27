'use strict';

import es6 from 'es6-promise';
es6.polyfill();
import fetch from 'isomorphic-fetch';

import { fetchOptions } from '../../../constants/routes';
import { setError, clearError } from './error';
import { setUser } from './user';

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
