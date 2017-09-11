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
    let agent = null;
    const login = 'l';
    const password = 'p';

    beforeEach(async () => {
        await dropDB.removeAll();
        agent = chai.request.agent(app);
    });

    after(dropDB.removeAll);

    afterEach(() => {
        agent = null;
    });

    describe('signUp', () => {
        it('sign up new user', async () => {
            const res = await client.post('/signup').send({ login, password });
            const { user } = res.body;

            res.status.should.equal(httpStatusCodes.OK);
            user.login.should.equal(login);
        });

        it('throw BAD REQUEST if user already signed up', async () => {
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

    describe('signOut', () => {
        beforeEach(async () => {
            await agent.post('/signup').send({ login, password });
        });

        it('sign out user', async () => {
            const res = await agent.post('/signout').send();
            const { user } = res.body;

            res.status.should.equal(httpStatusCodes.OK);
            (user === null).should.equal(true);
        });

        it('throw BAD REQUEST if sign out without sign in before it', async () => {
            await agent.post('/signout').send();

            try {
                await agent.post('/signout').send();
            } catch (err) {
                const { text } = err.response.body;

                text.should.equal(errors.notAuthenticated);
                err.response.status.should.equal(httpStatusCodes.BAD_REQUEST);
            }
        });
    });

    describe('addFriend', () => {
        const login2 = login + '0';

        beforeEach(async () => {
            await agent.post('/signup').send({ login, password });
            await client.post('/signup').send({ login: login2, password: password });
        });

        it('add friend', async () => {
            const res = await agent.post('/friend').send({ login: login2 });

            res.status.should.equal(httpStatusCodes.OK);
        });

        it('throw BAD REQUEST if already friends', async () => {
            await agent.post('/friend').send({ login: login2 });

            try {
                await agent.post('/friend').send({ login: login2 });
            } catch (err) {
                const { text } = err.response.body;
                text.should.equal(errors.alreadyFriends);
                err.response.status.should.equal(httpStatusCodes.BAD_REQUEST);

                const res = await agent.get('/friends').send();
                res.body.data.length.should.equal(1);
            }
        });

        it('should create dialog with recently added friend', async () => {
            await agent.post('/friend').send({ login: login2 });

            const res = await agent.get('/dialogs').send();
            const dialogs = res.body.data;
            const { participants } = dialogs[0];

            res.status.should.equal(httpStatusCodes.OK);
            dialogs.length.should.equal(1);
            participants.length.should.equal(2);
            participants.some(p => p.login === login2).should.equal(true);
        });
    });

    describe('getProfile', () => {
        beforeEach(async () => {
            await agent.post('/signup').send({ login, password });
        });

        it('gets user profile', async () => {
            const res = await agent.get('/profile').send();

            res.body.user.login.should.equal(login);
            res.status.should.equal(httpStatusCodes.OK);
        });
    });
});