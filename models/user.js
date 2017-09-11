'use strict';

const mongoose = require('../libs/mongoDB');
const errors = require('../constants/errors');
const Dialog = require('../models/dialog');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        index: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],

    dialogs: [{
        type: Schema.Types.ObjectId,
        ref: 'Dialog'
    }]
});

userSchema.statics.create = async function ({ login, password }) {
    if (await User.findOne({ login })) {
        throw new Error(errors.uniqueFieldAlreadyExists('login'));
    } else if (!login) {
        throw new Error(errors.fieldRequired('login'));
    } else if (!password) {
        throw new Error(errors.fieldRequired('password'));
    }

    const user = new this({ login, password });

    return user.save();
};

userSchema.methods.isFriends = function (user) {
    return this.friends.some(f => f.id.toString('hex') === user.id);
};

userSchema.methods.addFriend = async function (login) {
    const user = await User.findOne({ login });
    if (!user) {
        throw new Error(errors.notFound(login));
    }

    if (!this.isFriends(user)) {
        const dialog = await Dialog.create([this, user]);

        await this.friends.addToSet(user.id);
        await user.friends.addToSet(this.id);

        // await this.save();
        // await user.save();

        await this.addDialog(dialog);
        await user.addDialog(dialog);
    } else {
        throw new Error(errors.alreadyFriends);
    }
};

userSchema.methods.getFriends = async function () {
    const user = await User.populate(this, 'friends');

    return user.friends.map(f => f.toResponseObject());
};

userSchema.methods.addDialog = async function (dialog) {
    await this.dialogs.addToSet(dialog.id);

    await this.save();
};

userSchema.methods.toResponseObject = function () {
    const asObj = this.toObject();
    const { login } = asObj;

    return {
        login
    };
};

const User = mongoose.model('User', userSchema);

module.exports = User;