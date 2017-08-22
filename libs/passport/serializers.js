'use strict';

const User = require('../../models/user');

module.exports = {
    serializeUser(user, next) {
        next(null, user.id);
    },

    async deserializeUser(id, next) {
        try {
            next(null, await User.findById(id));
        } catch (err) {
            next(err);
        }
    }
};