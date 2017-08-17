'use strict';

const mongoose = require('../libs/mongoDB');

module.exports = {
    async removeAll() {
        const collections = mongoose.connection.collections;
        const promises = Object
            .keys(collections)
            .map(k => collections[k].drop());

        return Promise.all(promises);
    }
};