'use strict';

const { BadRequestError } = require('../libs/requestErrors');

function getUserProfile(req, res) {
    const { login } = req.user;
    res.locals.answer.user.login = login;

    res.json(res.locals.answer);
}

async function getDialogs(req, res) {
    res.locals.answer.user.dialogs = await req.user.getDialogs();

    res.json(res.locals.answer);
}

async function getFriends(req, res) {
    res.locals.answer.user.friends = req.user.getFriends();
    res.json(res.locals.answer);
}

async function addFriend(req, res, next) {
    const { user } = req;
    const { login } = req.body;

    try {
        await user.addFriend(login);
        res.json(res.locals.answer);
    } catch (err) {
        next(new BadRequestError(err.message));
    }
}

module.exports = {
    getUserProfile,
    getFriends,
    getDialogs,
    addFriend
};
