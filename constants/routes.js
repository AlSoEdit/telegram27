'use strict';

const actions = require('../views/store/actions');

const {
    setUser, clearUser,
    setDialogs, updateDialog
} = actions;

const authState = {
    url: '/authState',
    method: 'get'
};

const signin = {
    url: '/signin',
    text: 'Sign In',
    method: 'post',
    fields: ['login', 'password']
};

const signup = {
    url: '/signup',
    text: 'Sign Up',
    method: 'post',
    fields: ['login', 'password']
};

const profile = {
    url: '/profile',
    text: 'Profile',
    method: 'get',
    additionalAction: setUser
};

const dialogs = {
    url: '/dialogs',
    text: 'Dialogs',
    method: 'get',
    additionalAction: setDialogs
};

const dialog = {
    url: '/dialog',
    text: 'Dialog',
    method: 'get',
    additionalAction: updateDialog
};

const friend = {
    url: '/friend',
    text: 'Add friend',
    method: 'post',
    fields: ['login']
};

const signout = {
    url: '/signout',
    text: 'Sign Out',
    method: 'post',
    fields: [],
    additionalAction: clearUser
};

const message = {
    url: '/message',
    text: 'Send',
    method: 'post',
    fields: ['text']
};

const fetchOptions = {
    method: 'post',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
};

const notAuthNav = [signin, signup];

const authNav = [profile, dialogs];

const notAuthenticatedRoutes = {
    signin,
    signup,
    authState
};

const authenticatedRoutes = {
    profile,
    dialogs,
    dialog,
    friend,
    signout,
    message
};

module.exports = {
    fetchOptions,
    authenticatedRoutes, notAuthenticatedRoutes,
    authNav, notAuthNav
};
