'use strict';

const mongoose = require('../libs/mongoDB');
const { isValid } = mongoose.Types.ObjectId;
const errors = require('../constants/errors');
const Schema = mongoose.Schema;

const dialogSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        minlength: 1
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
    }]
});

dialogSchema.statics.create = function (participants) {
    if (!participants || participants.length === 0) {
        throw new Error(errors.shouldNotBeEmpty('participants'));
    }

    const title = participants.map(p => p.login).join(', ');
    participants = participants.map(p => p.id);
    const dialog = new this({ title, participants });

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

    const message = {text, author: author.id};
    this.messages.push(message);

    await this.save();

    return {
        text,
        author: author.login,
        date: Date.now()
    };
};

dialogSchema.methods.findByText = function (text) {
    text = text.toLowerCase();

    return this.messages
        .filter(m => m.text.toLowerCase().includes(text));
};

dialogSchema.statics.getById = async function (id) {
    if (!isValid(id)) {
        throw new Error(errors.notFound('dialog'));
    }

    const dialog = await Dialog.findById(id);
    if (!dialog) {
        throw new Error(errors.notFound('dialog'));
    }

    const populatedDialog = await Dialog.populate(dialog, [
        { path: 'participants' },
        { path: 'messages.author' }
    ]);

    return populatedDialog.toResponseObject();
};

dialogSchema.methods.toResponseObject = function () {
    const dObj = this.toObject();
    const id = dObj._id.id.toString('hex');
    const { participants, messages, title } = dObj;

    return {
        id,
        title,
        participants: participants.map(({ login }) => Object.assign({ login })),
        messages: messages.map(m => Object.assign({}, m, {author: m.author.login}))
    };
};

dialogSchema.statics.getByUser = async function (user) {
    const populatedUser = await Dialog.populate(user, {
        path: 'dialogs',
        populate: [
            {
                path: 'participants'
            },
            {
                path: 'messages.author'
            }
        ]
    });

    return populatedUser.dialogs.map(d => d.toResponseObject());
};

const Dialog = mongoose.model('Dialog', dialogSchema);

module.exports = Dialog;