'use strict';

const { PORT, HEROKU_APP_NAME } = process.env;

module.exports = {
    PORT,
    SOCKET_TYPE: 'wss',
    APP_NAME: `${HEROKU_APP_NAME}.herokuapp.com`
};