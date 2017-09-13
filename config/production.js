'use strict';

const { MONGO_USER, MONGO_PASS, MONGO_URI, PORT, HEROKU_APP_NAME } = process.env;

module.exports = {
    mongoUri: `${MONGO_USER}:${MONGO_PASS}@${MONGO_URI}`,
    SOCKET_TYPE: 'wss',
    PORT: PORT,
    APP_NAME: `${HEROKU_APP_NAME}.herokuapp.com`
};