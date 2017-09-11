'use strict';

const Dialog = require('../models/dialog');
const { BadRequestError, NotFoundError } = require('../libs/requestErrors');

async function addMessage(req, res, next) {
    const { id, text } = req.body;
    const author = req.user;
    const dialog = await Dialog.findById(id);

    try {
        res.locals.answer.data = await dialog.addMessage({ text, author });
        res.json(res.locals.answer);
    } catch (err) {
        next(new BadRequestError(err.message));
    }
}

async function getById(req, res, next) {
    try {
        res.locals.answer.data = await Dialog.getById(req.params.id);
        res.json(res.locals.answer);
    } catch (err) {
        next(new NotFoundError(err.message));
    }
}

async function getByUser(req, res, next) {
    try {
        res.locals.answer.data = await Dialog.getByUser(req.user);
        res.json(res.locals.answer);
    } catch (err) {
        next(new NotFoundError(err.message));
    }
}

module.exports = {
    addMessage,
    getById,
    getByUser
};
