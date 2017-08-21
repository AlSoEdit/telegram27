/* eslint-env mocha */
'use strict';

const User = require('../../models/user');
const Dialog = require('../../models/dialog');
const errors = require('../../constants/errors');
const dropDB = require('../../scripts/dropDB');

require('chai').should();

describe('models : Dialog', () => {
    let user1, user2, user3 = null;
    const user1Data = {login: 'a', password: 'p'};
    const user2Data = {login: 'b', password: 'p'};
    const user3Data = {login: 'c', password: 'p'};

    beforeEach(async () => {
        await dropDB.removeAll();
        user1 = await User.create(user1Data);
        user2 = await User.create(user2Data);
        user3 = await User.create(user3Data);
    });

    describe('create', () => {
        it('creates dialog', async () => {
            const participants = [user1, user2, user3];
            const dialog = await Dialog.create(participants);

            dialog.participants.length.should.equal(3);

            const newParticipants = await Dialog.populate(dialog, 'participants');
            newParticipants.participants.forEach((p, index) => {
                p._id.equals(participants[index]._id).should.equal(true);
            });
        });

        it('should not create dialog without participants', async () => {
            try {
                await Dialog.create([]);
            } catch (err) {
                err.message.should.equal(errors.shouldNotBeEmpty('participants'));
            }
        });
    });

    describe('addParticipants', () => {
        it('add participant', async () => {
            const dialog = await Dialog.create([user1, user2]);
            await dialog.addParticipants([user3]);

            const newDialog = await Dialog.populate(dialog, 'participants');

            newDialog.participants.length.should.equal(3);
            newDialog.participants[2]._id.equals(user3._id).should.equal(true);
        });

        it('should not add existing participant a second time', async () => {
            const dialog = await Dialog.create([user1, user2]);
            await dialog.addParticipants([user3]);
            await dialog.addParticipants([user3]);

            const newDialog = await Dialog.populate(dialog, 'participants');

            newDialog.participants.length.should.equal(3);
            newDialog.participants[2]._id.equals(user3._id).should.equal(true);
        });

        it('should throw error on empty participants', async () => {
            const dialog = await Dialog.create([user1, user2]);

            try {
                await dialog.addParticipants([]);
            } catch (err) {
                err.message.should.equal(errors.shouldNotBeEmpty('participants'));
            }
        });
    });

    describe('addMessage', () => {
        let dialog = null;

        beforeEach(async () => {
            dialog = await Dialog.create([user1, user2]);
        });

        it('add message', async () => {
            const message = {text: 't', author: user1};
            await dialog.addMessage(message);

            dialog.messages.length.should.equal(1);
            dialog.messages[0].text.should.equal(message.text);
            dialog.messages[0].author._id.equals(message.author._id).should.equal(true);
        });

        it('should throw error if user not a participant', async () => {
            const message = {text: 't', author: user3};

            try {
                await dialog.addMessage(message);
            } catch (err) {
                err.message.should.equal(errors.cannotAddMessageIfNotParticipant);
            }
        });
    });

    describe('findByText', () => {
        let dialog = null;
        const text = 'some text';
        const messages = [{text}, {text}];
        const partToFind = text.slice(5);

        beforeEach(async () => {
            dialog = await Dialog.create([user1, user2]);
            const promises = messages.map(m => {
                m.author = user1;

                return dialog.addMessage(m);
            });

            return Promise.all(promises);
        });

        it('find by text', async () => {
            const suitableMessages = await dialog.findByText(partToFind);

            suitableMessages.length.should.equal(messages.length);

            suitableMessages.forEach(m => {
                m.text.includes(partToFind).should.equal(true);
            });
        });

        it('should return empty array if message not in dialog', async () => {
            const suitableMessages = await dialog.findByText(text + '0');

            suitableMessages.length.should.equal(0);
        });

        it('should find case insensitive', async () => {
            const upperCasePart = partToFind.toUpperCase();
            const suitableMessages = await dialog.findByText(upperCasePart);

            suitableMessages.length.should.equal(messages.length);
        });
    });
});
