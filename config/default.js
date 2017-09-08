'use strict';

module.exports = {
    port: 8080,

    dbOptions: {
        path: 'localhost',
        port: '27017',
    },

    sessionConfig: {
        secret: 'Secret',
        saveUninitialized: false,
        resave: false
    }
};