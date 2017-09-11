'use strict';

const config = require('config');
const mongoose = require('mongoose');

const mongoUri = config.get('mongoUri');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${mongoUri}`, {
    useMongoClient: true,
    promiseLibrary: global.Promise
});

const db = mongoose.connection;

db.once('open', () => {});

db.on('error', err => {
    console.error(err.message);
    console.info('Close app');
    process.exit(1);
});

module.exports = mongoose;