'use strict';

const mongoose = require('../libs/mongoDB');

module.exports = {
    removeAll() {
        const collections = mongoose.connection.collections;
        const promises = Object
            .keys(collections)
            .map(k => collections[k].remove({}));

        return Promise.all(promises);
    }
};