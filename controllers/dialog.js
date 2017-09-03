'use strict';

const Dialog = require('../models/dialog');
const { BadRequestError } = require('../libs/requestErrors');

async function addMessage(req, res, next) {
    const shortId = req.body.id;
    const dialog = await Dialog.findOne({ shortId });
    const { text } = req.body;
    const author = req.user;

    try {
        await dialog.addMessage({ text, author });
        res.json(res.locals.answer);
    } catch (err) {
        next(new BadRequestError(err.message));
    }
}

module.exports = {
    addMessage
};
