'use strict';

const mongoose = require('../libs/mongoDB');

module.exports = {
    async removeAll() {
        await mongoose.connection.dropDatabase();
        console.info('DB cleared');
    }
};