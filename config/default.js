'use strict';

const expressSession = require('express-session');

module.exports = {
    port: 8080,
    PORT: 8080,
    APP_NAME: 'localhost:8080',
    mongoUri: 'localhost:27017',
    SOCKET_TYPE: 'ws',
    sessionParser: expressSession({
        secret: 'Secret',
        saveUninitialized: false,
        resave: false
    })
};