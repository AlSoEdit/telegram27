'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat_db');
const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.once('open', () => {});

db.on('error', err => {
    console.error(err);
    console.info('Close app');
    process.exit(1);
});

module.exports = mongoose;