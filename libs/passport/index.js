'use strict';

const passport = require('passport');
const strategy = require('./strategy');
const { serializeUser, deserializeUser } = require('./serializers');

passport.use(strategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = passport;
