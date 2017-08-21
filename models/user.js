'use strict';

const mongoose = require('../libs/mongoDB');
const errors = require('../constants/errors');
const Dialog = require('../models/dialog');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    login: {
        type: String,
        required: [true, errors.fieldRequired('login')],
        index: true,
        unique: true
    },

    password: {
        type: String,
        required: [true, errors.fieldRequired('password')]
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

userSchema.statics.create = async function ({login, password}) {
    if (await User.findOne({login})) {
        throw new Error(errors.uniqueFieldAlreadyExists('login'));
    }

    const user = new this({login, password});

    return user.save();
};

userSchema.methods.addFriend = async function (friend) {
    const dialog = await Dialog.create([this, friend]);

    await this.friends.addToSet(friend.id);
    await friend.friends.addToSet(this.id);

    await this.addDialog(dialog);
    await friend.addDialog(dialog);
};

userSchema.methods.deleteFriend = async function (friend) {
    const isFriends = this.friends.some(f => f.id.toString('hex') === friend.id);

    if (!isFriends) {
        throw new Error(errors.cannotDeleteFriendIfNotFriends);
    }

    await this.friends.pull(friend.id);
    await friend.friends.pull(this.id);
};

userSchema.methods.addDialog = async function (dialog) {
    this.dialogs.push(dialog.id);

    await this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;