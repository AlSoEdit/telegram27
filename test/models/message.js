/* eslint-env mocha */
'use strict';

const Message = require('../../models/message');
const dropDB = require('../../scripts/dropDB');

require('chai').should();

const messageData = {
    text: 'Some text'
    // author: 'John'
};

describe('model : Message', () => {
    beforeEach(() => dropDB.removeAll());

    it('creates message', async () => {
        const msg = await Message.create(messageData);
        const foundMessage = await Message.find(messageData);

        foundMessage.length.should.equal(1);
        foundMessage[0].text.should.equal(msg.text);
    });
});
