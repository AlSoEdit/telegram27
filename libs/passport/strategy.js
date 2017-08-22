'use strict';

const LocalStrategy = require('passport-local');
const User = require('../../models/user');

module.exports = new LocalStrategy({ usernameField: 'login' }, async (login, password, next) => {
    try {
        next(null, await User.findOne({ login, password }));
    } catch (err) {
        next(err);
    }
});

