/* eslint-env mocha */
'use strict';

const User = require('../../models/user');
const errors = require('../../constants/errors');
const dropDB = require('../../scripts/dropDB');

require('chai').should();

const userData = {
    login: 'John',
    password: 'pass'
};

describe('models : User', () => {
    beforeEach(dropDB.removeAll);

    after(dropDB.removeAll);

    describe('create', () => {
        it('creates user', async () => {
            const user = await User.create(userData);
            const foundUser = await User.find(userData);

            foundUser.length.should.equal(1);
            foundUser[0].login.should.equal(user.login);
        });

        it('should not create user without login', async () => {
            try {
                await User.create({password: 'p'});
            } catch (err) {
                err.message.should.equal(errors.fieldRequired('login'));
            }
        });

        it('should not create user without password', async () => {
            try {
                await User.create({login: 'p'});
            } catch (err) {
                err.message.should.equal(errors.fieldRequired('password'));
            }
        });

        it('should not create user if login already exists', async () => {
            await User.create(userData);

            try {
                await User.create(userData);
            } catch (err) {
                err.message.should.equal(errors.uniqueFieldAlreadyExists('login'));
            }
        });
    });

    describe('friends', () => {
        const user1Data = userData;
        const user2Data = {login: 'l', password: 'p'};
        let user1 = null;
        let user2 = null;

        beforeEach(async () => {
            user1 = await User.create(user1Data);
            user2 = await User.create(user2Data);
        });

        describe('addFriend', () => {
            it('add user to friends', async () => {
                await user1.addFriend(user2.login);

                [user1, user2] = await User.find({}).populate('friends');

                user1.friends[0].id.should.equal(user2.id);
                user2.friends[0].id.should.equal(user1.id);
            });

            it('should not add user to friends if already friend', async () => {
                await user1.addFriend(user2.login);
                try {
                    await user1.addFriend(user2.login);
                } catch (err) {
                    err.message.should.equal(errors.alreadyFriends);
                }

                [user1, user2] = await User.find({}).populate('friends');

                user1.friends.length.should.equal(1);
                user2.friends.length.should.equal(1);
            });

            it('add dialog to both friends after addFriend', async () => {
                await user1.addFriend(user2.login);
                [user1, user2] = await User.find({}).populate('friends');

                user1.dialogs.length.should.equal(1);
                user2.dialogs.length.should.equal(1);
            });
        });

        describe('isFriends', () => {
            it('true if friends', async () => {
                await user1.addFriend(user2.login);

                user1.isFriends(user2).should.equal(true);
            });

            it('false if not friends', () => {
                user1.isFriends(user2).should.equal(false);
            });
        });
    });
});