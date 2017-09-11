/* eslint-env mocha */
'use strict';

const dropDB = require('../../scripts/dropDB');
const errors = require('../../constants/errors');
const app = require('../../app');
const httpStatusCodes = require('http-status-codes');

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const client = chai.request(app);

describe('controllers : dialog', () => {
    const login1 = 'l';
    const password = 'p';
    const login2 = login1 + '0';
    const user1Data = { login: login1, password };
    const user2Data = { login: login2, password };
    const text = 'text';
    let agent = null;
    let id = null;

    beforeEach(async () => {
        agent = chai.request.agent(app);
        await dropDB.removeAll();

        await client.post('/signup').send(user1Data);
        await agent.post('/signup').send(user2Data);
        await agent.post('/friend').send({ login: login1 });

        const res = await agent.get('/dialogs').send();
        id = res.body.data[0].id;
    });

    afterEach(() => agent = null);

    describe('addMessage', () => {
        it('add message to dialog', async () => {
            let res = await agent.post('/message').send({ id, text });

            res.status.should.equal(httpStatusCodes.OK);

            res = await agent.get(`/dialog/${id}`).send();
            const dialog = res.body.data;

            dialog.messages.length.should.equal(1);
            dialog.messages[0].text.should.equal(text);
        });

        it('throw BAD REQUEST when add message if not participant', async () => {
            const user3 = { login: login2 + '0', password };
            await agent.post('/signout').send();
            await agent.post('/signup').send(user3);

            try {
                await agent.post('/message').send({ id, text });
            } catch (err) {
                const { body, status } = err.response;

                status.should.equal(httpStatusCodes.BAD_REQUEST);
                body.text.should.equal(errors.cannotAddMessageIfNotParticipant);
            }
        });
    });

    describe('getById', () => {
        it('get dialog by id', async () => {
            const res = await agent.get(`/dialog/${id}`).send();
            const dialog = res.body.data;
            const { participants } = dialog;

            res.status.should.equal(httpStatusCodes.OK);

            dialog.id.should.equal(id);
            dialog.messages.length.should.equal(0);

            participants.length.should.equal(2);
            participants.some(p => p.login === login1).should.equal(true);
            participants.some(p => p.login === login2).should.equal(true);
        });

        it('throw NOT FOUND if dialog not exists', async () => {
            try {
                await agent.get(`/dialog/${Math.round(Math.random() * 10)}`).send();
            } catch (err) {
                err.response.status.should.equal(httpStatusCodes.NOT_FOUND);
                err.response.body.text.should.equal(errors.notFound('dialog'));
            }
        });
    });

    describe('getByUser', () => {
        it('get dialogs by user', async () => {
            const res = await agent.get('/dialogs').send();
            const dialogs = res.body.data;
            const { participants } = dialogs[0];

            res.status.should.equal(httpStatusCodes.OK);
            dialogs.length.should.equal(1);
            dialogs[0].id.should.equal(id);
            dialogs[0].messages.length.should.equal(0);

            participants.length.should.equal(2);
            participants.some(p => p.login === login1).should.equal(true);
            participants.some(p => p.login === login2).should.equal(true);
        });
    });
});
