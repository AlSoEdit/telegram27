'use strict';

const config = require('config');
const mongoose = require('mongoose');

const options = config.get('dbOptions');
const { path, port } = options;
mongoose.connect(`mongodb://${path}:${port}`);
const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.once('open', () => {});

db.on('error', err => {
    console.error(err.message);
    console.info('Close app');
    process.exit(1);
});

module.exports = mongoose;