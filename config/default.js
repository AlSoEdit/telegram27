'use strict';

const expressSession = require('express-session');

const PORT = 8080;

module.exports = {
    PORT,
    APP_NAME: `localhost:${PORT}`,
    MONGO_URI: process.env.MONGO_URI || 'localhost:27017',
    SOCKET_TYPE: 'ws',
    sessionParser: expressSession({
        secret: 'Secret',
        saveUninitialized: false,
        resave: false
    })
};
