'use strict';

const signin = {
    url: '/signin',
    text: 'Sign In',
    method: 'post',
    fields: ['login', 'password'],
    isNavLink: true
};

const signup = {
    url: '/signup',
    text: 'Sign Up',
    method: 'post',
    fields: ['login', 'password'],
    isNavLink: true
};

const profile = {
    url: '/profile',
    text: 'Profile',
    method: 'get',
    isNavLink: true
};

const dialogs = {
    url: '/dialogs',
    text: 'Dialogs',
    method: 'get',
    isNavLink: true
};

const friend = {
    url: '/friend',
    fields: ['login'],
    method: 'post',
    text: 'Add friend'
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
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        method: 'post',
        credentials: 'same-origin'
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