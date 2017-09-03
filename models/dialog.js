'use strict';

const mongoose = require('../libs/mongoDB');
const errors = require('../constants/errors');
const shortId = require('shortid');
const Schema = mongoose.Schema;

const dialogSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        minlength: 2
    }],

    messages: [{
        text: {
            type: String,
            required: true
        },

        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    }],

    shortId: {
        type: String
    }
});

dialogSchema.statics.create = function (participants) {
    if (!participants || participants.length === 0) {
        throw new Error(errors.shouldNotBeEmpty('participants'));
    }

    participants = participants.map(p => p.id);
    const dialog = new this({participants});
    dialog.shortId = shortId.generate();

    return dialog.save();
};

dialogSchema.methods.addParticipants = async function (participants) {
    if (!participants || participants.length === 0) {
        throw new Error(errors.shouldNotBeEmpty('participants'));
    }

    participants.forEach(p => this.participants.addToSet(p.id));
    await this.save();
};

dialogSchema.methods.addMessage = async function ({text, author}) {
    const isParticipant = this.participants
        .some(p => p.id.toString('hex') === author.id);

    if (!text || text.length === 0) {
        throw new Error(errors.shouldNotBeEmpty('message'));
    } else if (!isParticipant) {
        throw new Error(errors.cannotAddMessageIfNotParticipant);
    }

    this.messages.push({text, author: author.id});

    await this.save();
};

dialogSchema.methods.findByText = function (text) {
    text = text.toLowerCase();

    return this.messages
        .filter(m => m.text.toLowerCase().includes(text));
};

const Dialog = mongoose.model('Dialog', dialogSchema);

module.exports = Dialog;