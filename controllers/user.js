'use strict';

const User = require('../models/user');
const passport = require('../libs/passport');
const errors = require('../constants/errors');
const httpStatusCodes = require('http-status-codes');
const { BadRequestError } = require('../libs/requestErrors');

async function signUp(req, res, next) {
    const { login, password } = req.body;

    try {
        await User.create({ login, password });
        res.status(httpStatusCodes.OK);
        next();
    } catch (err) {
        next(new BadRequestError(err.message));
    }
}

function passIfAuthenticated(req, res, next) {
    if (!req.user) {
        next(new BadRequestError(errors.notAuthenticated));
    } else {
        next();
    }
}

function signIn(req, res, next) {
    if (req.user) {
        throw new BadRequestError(errors.alreadyAuthenticated);
    }

    passport.authenticate('local', (err, user) => {
        if (!user) {
            next(new BadRequestError(errors.wrongLoginOrPassword));
        } else {
            req.logIn(user, next);
        }
    })(req, res, next);
}

function signOut(req, res) {
    req.session.destroy();
    req.logout();
    res.json(JSON.stringify({ isAuthenticated: false }));
}

function setAuthState(req, res) {
    const json = JSON.stringify({isAuthenticated: req.user !== undefined});

    res.json(json);
}

module.exports = {
    signUp,
    signIn,
    setAuthState,
    signOut,
    passIfAuthenticated
};