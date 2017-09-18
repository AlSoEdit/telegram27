'use strict';

const { ADD_MESSAGE, setResponseText } = require('../views/store/actions');
const Dialog = require('../models/dialog');
const User = require('../models/user');
const WebSocket = require('ws');
const { BadRequestError, NotFoundError } = require('../libs/requestErrors');

function sendErrorResponseText(sock, text) {
    sock.send(JSON.stringify(
        setResponseText({ text, isError: true })
    ));
}

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

async function wsDialog(action, sock, clients) {
    switch (action.type) {
    case ADD_MESSAGE: {
        await wsAddMessage(action, sock, clients);
        break;
    }
    default:
        return;
    }
}

async function wsAddMessage(action, sock, clients) {
    const { text } = action.payload.message;
    const { id } = action.payload;
    const dialog = await Dialog.findById(id);

    const participants = dialog
        .toObject()
        .participants
        .map(p => p.id.toString('hex'));

    try {
        await dialog.addMessage({ text, author: await User.findById(sock.user) });

        clients
            .filter(client => {
                const isParticipant = participants.includes(client.user);
                const isOpen = client.readyState === WebSocket.OPEN;
                const notMessageSender = client.user !== sock.user;

                return isOpen && isParticipant && notMessageSender;
            })
            .forEach(client => client.send(JSON.stringify(action)));
    } catch (err) {
        sendErrorResponseText(sock, err.message);
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
    wsDialog,
    getById,
    getByUser
};
