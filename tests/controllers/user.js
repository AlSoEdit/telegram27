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
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                err.response.text.should.equal(errors.uniqueFieldAlreadyExists('login'));
            }
        });

        it('throw BAD REQUEST if login was not sent', async () => {
            try {
                await client.post('/signup').send({ password });
            } catch (err) {
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                err.response.text.should.equal(errors.fieldRequired('login'));
            }
        });

        it('throw BAD REQUEST if password was not sent', async () => {
            try {
                await client.post('/signup').send({ login });
            } catch (err) {
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                err.response.text.should.equal(errors.fieldRequired('password'));
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
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                err.response.text.should.equal(errors.alreadyAuthenticated);
            }
        });

        it('throw BAD REQUEST if user not signed up', async () => {
            try {
                await client.post('/signin').send({login: login + '0', password});
            } catch (err) {
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                err.response.text.should.equal(errors.wrongLoginOrPassword);
            }
        });

        it('throw BAD REQUEST on wrong password', async () => {
            try {
                await client.post('/signin').send({login, password: password + '0'});
            } catch (err) {
                err.status.should.equal(httpStatusCodes.BAD_REQUEST);
                err.response.text.should.equal(errors.wrongLoginOrPassword);
            }
        });
    });
});