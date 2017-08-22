'use strict';

const User = require('../models/user');
const passport = require('../libs/passport');
const errors = require('../constants/errors');
const httpStatusCodes = require('http-status-codes');
const { BadRequestError } = require('../libs/requestErrors');

async function signUp(req, res, next) {
    const { login, password } = req.body;

    try {
        await User.create({login, password});
        res.status(httpStatusCodes.OK).send();
    } catch (err) {
        next(new BadRequestError(err.message));
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
            req.logIn(user, () => res.status(httpStatusCodes.OK).send());
        }
    })(req, res, next);
}

module.exports = {
    signUp,
    signIn
};