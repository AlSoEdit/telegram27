'use strict';

const Dialog = require('../models/dialog');
const { BadRequestError } = require('../libs/requestErrors');

async function addMessage(req, res, next) {
    const { id, text } = req.body;
    const author = req.user;
    const dialog = await Dialog.findById(id);

    try {
        await dialog.addMessage({ text, author });
        res.json(res.locals.answer);
    } catch (err) {
        next(new BadRequestError(err.message));
    }
}

async function getById(req, res) {
    res.locals.answer.user.dialogs = [await Dialog.getById(req.params.id)];

    res.json(res.locals.answer);
}

async function getByUser(req, res) {
    res.locals.answer.user.dialogs = await Dialog.getByUser(req.user);

    res.json(res.locals.answer);
}

module.exports = {
    addMessage,
    getById,
    getByUser
};
