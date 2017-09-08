'use strict';

const LocalStrategy = require('passport-local');
const User = require('../../models/user');

const strategyOptions = {
    usernameField: 'login'
};

module.exports = new LocalStrategy(strategyOptions, async (login, password, next) => {
    try {
        next(null, await User.findOne({ login, password }));
    } catch (err) {
        next(err);
    }
});

