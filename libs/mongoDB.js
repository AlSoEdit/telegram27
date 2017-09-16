'use strict';

const config = require('config');
const mongoose = require('mongoose');

const MONGO_URI = config.get('MONGO_URI');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${MONGO_URI}`, {
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