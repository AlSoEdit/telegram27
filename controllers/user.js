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
            res.locals.answer.user = user.toResponseObject();
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
    res.locals.answer = res.locals.answer || {};
    res.locals.answer.user = req.user ? req.user.toResponseObject() : null;

    next();
}

function passIfAuthenticated(req, res, next) {
    if (!req.user) {
        next(new BadRequestError(errors.notAuthenticated));
    } else {
        next();
    }
}

function getProfile(req, res) {
    res.locals.answer.user = req.user.toResponseObject();
    res.json(res.locals.answer);
}

async function getFriends(req, res) {
    res.locals.answer.user.friends = req.user.getFriends();
    res.json(res.locals.answer);
}

async function addFriend(req, res, next) {
    const { user } = req;
    const { login } = req.body;

    try {
        await user.addFriend(login);
        res.json(res.locals.answer);
    } catch (err) {
        next(new BadRequestError(err.message));
    }
}

module.exports = {
    signUp,
    signIn,
    signOut,
    passIfAuthenticated,
    setAuthState,
    getProfile,
    getFriends,
    addFriend
};
