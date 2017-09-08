'use strict';

const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/user');

router
    .post('/signup', userController.signUp)
    .post('/signin', userController.signIn)
    .post('/signout', userController.passIfAuthenticated, userController.signOut);

router
    .get('/profile', userController.passIfAuthenticated, userController.getProfile);

router
    .post('/friend', userController.passIfAuthenticated, userController.addFriend)
    .get('/friends', userController.passIfAuthenticated, userController.getFriends);

module.exports = router;