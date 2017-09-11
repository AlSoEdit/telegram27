'use strict';

const { MONGO_USER, MONGO_PASS, MONGO_URI } = process.env;

module.exports = {
    mongoUri: `${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}`
};