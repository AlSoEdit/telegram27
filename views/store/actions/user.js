'use strict';

const SET_USER = 'SET_USER';
const setUser = user => {
    return {
        type: SET_USER,
        payload: user
    };
};

module.exports = {
    SET_USER, setUser
};
