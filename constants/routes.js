'use strict';

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
    method: 'get'
};

const dialogs = {
    url: '/dialogs',
    text: 'Dialogs',
    method: 'get'
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
    method: 'post'
};

const message = {
    url: '/message',
    text: 'Send',
    method: 'post',
    fields: ['text']
};

module.exports = {
    fetchOptions: {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    },

    notAuthNav: [signin, signup],

    authNav: [profile, dialogs],

    notAuthenticatedRoutes: {
        signin,
        signup
    },

    authenticatedRoutes: {
        profile,
        dialogs,
        friend,
        signout,
        message
    }
};