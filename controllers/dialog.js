'use strict';

const { ADD_MESSAGE } = require('../views/store/actions/dialog');
const Dialog = require('../models/dialog');
const User = require('../models/user');
const WebSocket = require('ws');
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

async function wsAddMessage(sock, req, clients) {
    const { user } = req.session.passport;
    if (!user) {
        return sock.close();
    }

    sock.user = user;

    sock.on('message', async message => {
        const action = JSON.parse(message);
        const { text } = action.payload.message;
        const { dialogId } = action.payload;
        const dialog = await Dialog.findById(dialogId);

        let { participants } = dialog.toObject();
        participants = participants.map(p => p.id.toString('hex'));

        switch (action.type) {
        case ADD_MESSAGE:
            await dialog.addMessage({ text, author: await User.findById(user) });
            clients.forEach(client => {
                const isParticipant = participants.includes(client.user);
                const isOpen = client.readyState === WebSocket.OPEN;
                const isDifferentUsers = client.user !== sock.user;

                if (isOpen && isParticipant && isDifferentUsers) {
                    client.send(message);
                }
            });

            break;
        default:
            return;
        }
    });
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
    wsAddMessage,
    getById,
    getByUser
};
