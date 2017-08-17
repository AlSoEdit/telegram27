'use strict';

const mongoose = require('../libs/mongoDB');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const messageSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    // author: {
    //     type: ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

messageSchema.statics.create = function({text, author}) {
    // проверка на существование пользователя

    if (text === '') {
        throw new Error('Message can\'t be empty');
    }

    const message = new this({text});

    return message.save();
};


//messageSchema.statics.findByText

module.exports = mongoose.model('Message', messageSchema);
