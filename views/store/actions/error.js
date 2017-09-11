'use strict';

export const SET_ERROR = 'SET_ERROR';
export function setError(errorText) {
    return {
        type: SET_ERROR,
        payload: errorText
    };
}

export const CLEAR_ERROR = 'CLEAR_ERROR';
export function clearError() {
    return {
        type: CLEAR_ERROR
    };
}