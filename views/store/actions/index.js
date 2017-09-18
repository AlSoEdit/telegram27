'use strict';

const user = require('./user');
const error = require('./response-text');
const dialog = require('./dialog');
const request = require('./request');

module.exports = {
    ...user,
    ...error,
    ...dialog,
    ...request
};