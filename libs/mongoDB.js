'use strict';

const config = require('config');
const mongoose = require('mongoose');

const mongoUri = config.get('mongoUri');
mongoose.connect(`mongodb://${mongoUri}`);
const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.once('open', () => {});

db.on('error', err => {
    console.error(err.message);
    console.info('Close app');
    process.exit(1);
});

module.exports = mongoose;