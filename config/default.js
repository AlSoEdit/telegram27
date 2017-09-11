'use strict';

module.exports = {
    port: 8080,
    mongoUri: 'localhost:27017',
    sessionConfig: {
        secret: 'Secret',
        saveUninitialized: false,
        resave: false
    }
};