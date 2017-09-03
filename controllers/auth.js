'use strict';

const User = require('../models/user');
const passport = require('../libs/passport');
const errors = require('../constants/errors');
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

function signIn(req, res, next) {
    passport.authenticate('local', (err, user) => {
        if (!user) {
            next(new BadRequestError(errors.wrongLoginOrPassword));
        } else {
            res.locals.answer.user = { login: user.login };
            req.logIn(user, () => res.json(res.locals.answer));
        }
    })(req, res, next);
}

function signOut(req, res) {
    req.session.destroy();
    req.logout();

    res.locals.answer.user = null;
    res.json(res.locals.answer);
}

function setAuthState(req, res, next) {
    res.locals.answer = {};

    if (req.user) {
        const { login } = req.user;
        res.locals.answer.user = { login };
    } else {
        res.locals.answer.user = null;
    }

    next();
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

module.exports = {
    signUp,
    signIn,
    signOut,
    passIfAuthenticated,
    passIfNotAuthenticated,
    setAuthState
};
