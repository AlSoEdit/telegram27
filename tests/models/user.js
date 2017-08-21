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
                err.errors.login.message.should.equal(errors.fieldRequired('login'));
            }
        });

        it('should not create user without password', async () => {
            try {
                await User.create({login: 'p'});
            } catch (err) {
                err.errors.password.message.should.equal(errors.fieldRequired('password'));
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

    describe('addFriend', () => {
        const user1Data = userData;
        const user2Data = {login: 'l', password: 'p'};
        let user1 = null;
        let user2 = null;

        beforeEach(async () => {
            user1 = await User.create(user1Data);
            user2 = await User.create(user2Data);
        });

        it('should add user to friends', async () => {
            await user1.addFriend(user2);

            const user1Friend = (await User.populate(user1, 'friends')).friends[0];
            const user2Friend = (await User.populate(user2, 'friends')).friends[0];

            user1Friend.id.should.equal(user2.id);
            user2Friend.id.should.equal(user1.id);
        });

        it('should not add user to friends if already friend', async () => {
            await user1.addFriend(user2);
            await user1.addFriend(user2);

            const user1Friend = (await User.populate(user1, 'friends'));
            const user2Friend = (await User.populate(user2, 'friends'));

            user1Friend.friends.length.should.equal(1);
            user2Friend.friends.length.should.equal(1);
        });

        it('add dialog to both friends after addFriend', () => {

        });
    });

    describe('deleteFriend', () => {
        const user1Data = userData;
        const user2Data = {login: 'l', password: 'p'};
        let user1 = null;
        let user2 = null;

        beforeEach(async () => {
            user1 = await User.create(user1Data);
            user2 = await User.create(user2Data);
            await user1.addFriend(user2);
        });

        it('deletes friend', async () => {
            await user1.deleteFriend(user2);

            const user1Friend = (await User.populate(user1, 'friends'));
            const user2Friend = (await User.populate(user2, 'friends'));

            user1Friend.friends.length.should.equal(0);
            user2Friend.friends.length.should.equal(0);
        });

        it('throw error if delete user which is not a friend', async () => {
            const user3 = await User.create({login: 'o', password: 't'});

            try {
                await user2.deleteFriend(user3);
            } catch (err) {
                err.message.should.equal(errors.cannotDeleteFriendIfNotFriends);
            }
        });
    });

    // describe('addDialog', () => {
    //     it('add dialog to both friends', () => {
    //
    //     }) ;
    // });
});