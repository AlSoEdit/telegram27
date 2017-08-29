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
        await signIn(req, res, next);
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

function passIfNotAuthenticated(req, res, next) {
    if (req.user) {
        next(new BadRequestError(errors.alreadyAuthenticated));
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
            req.logIn(user, () => {
                res.locals.answer.isAuthenticated = true;
                res.json(res.locals.answer);
            });
        }
    })(req, res, next);
}

function signOut(req, res) {
    req.session.destroy();
    req.logout();

    res.locals.answer.isAuthenticated = false;
    res.json(res.locals.answer);
}

function setAuthState(req, res, next) {
    res.locals.answer = Object.assign(
        res.locals.answer || {},
        {isAuthenticated: req.user !== undefined}
    );

    next();
}

function getUserProfile(req, res) {
    const { login } = req.user;
    res.locals.answer = Object.assign(res.locals.answer || {}, { login });

    res.json(res.locals.answer);
}

module.exports = {
    signUp,
    signIn,
    setAuthState,
    signOut,
    passIfAuthenticated,
    passIfNotAuthenticated,
    getUserProfile
};