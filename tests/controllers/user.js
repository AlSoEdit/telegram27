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

describe('controllers : User', () => {
    beforeEach(dropDB.removeAll);

    const login = 'l';
    const password = 'p';

    describe('signUp', () => {
        it('sign up new user', async () => {
            const res = await client.post('/signup').send({ login, password });
            res.status.should.equal(httpStatusCodes.OK);
        });

        it('throw BAD REQUEST if user already sign up', async () => {
            await client.post('/signup').send({ login, password });

            try {
                await client.post('/signup').send({ login, password });
            } catch (err) {
                const { text } = err.response.body;
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                text.should.equal(errors.uniqueFieldAlreadyExists('login'));
            }
        });

        it('throw BAD REQUEST if login was not sent', async () => {
            try {
                await client.post('/signup').send({ password });
            } catch (err) {
                const { text } = err.response.body;
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                text.should.equal(errors.fieldRequired('login'));
            }
        });

        it('throw BAD REQUEST if password was not sent', async () => {
            try {
                await client.post('/signup').send({ login });
            } catch (err) {
                const { text } = err.response.body;
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                text.should.equal(errors.fieldRequired('password'));
            }
        });
    });

    describe('signIn', () => {
        beforeEach(async () => {
            await client.post('/signup').send({ login, password });
        });

        it('sign in', async () => {
            const res = await client.post('/signin').send({ login, password });

            res.status.should.equal(httpStatusCodes.OK);
        });

        it('throw BAD REQUEST if already signed in', async () => {
            const agent = chai.request.agent(app);
            await agent.post('/signIn').send({ login, password });

            try {
                await agent.post('/signin').send({ login, password });
            } catch (err) {
                const { text } = err.response.body;
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                text.should.equal(errors.alreadyAuthenticated);
            }
        });

        it('throw BAD REQUEST if user not signed up', async () => {
            try {
                await client.post('/signin').send({login: login + '0', password});
            } catch (err) {
                const { text } = err.response.body;
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                text.should.equal(errors.wrongLoginOrPassword);
            }
        });

        it('throw BAD REQUEST on wrong password', async () => {
            try {
                await client.post('/signin').send({login, password: password + '0'});
            } catch (err) {
                const { text } = err.response.body;
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                text.should.equal(errors.wrongLoginOrPassword);
            }
        });
    });

    describe('add friend', () => {
        const login2 = login + '0';
        let agent = null;

        beforeEach(async () => {
            agent = chai.request.agent(app);
            await agent.post('/signup').send({ login, password });
            await client.post('/signup').send({ login: login2, password: password });
        });

        it('should add friend', async () => {
            const res = await agent.post('/friend').send({ login: login2 });

            res.status.should.equal(httpStatusCodes.OK);
        });

        it('should not add friend if already friends', async () => {
            await agent.post('/friend').send({ login: login2 });

            try {
                await agent.post('/friend').send({ login: login2 });
            } catch (err) {
                const { text } = err.response.body;
                text.should.equal(errors.alreadyFriends);
            }

            const res = await agent.get('/dialogs').send();
            const { dialogs } = res.body.user;

            res.status.should.equal(httpStatusCodes.OK);
            dialogs[0].participants.length.should.equal(2);
            dialogs.length.should.equal(1);
        });
    });
});