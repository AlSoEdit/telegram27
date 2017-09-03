'use strict';

const { Router } = require('express');
const router = new Router();
const authController = require('../controllers/auth');
const userController = require('../controllers/user');
const dialogController = require('../controllers/dialog');

router
    .post('/signup', authController.passIfNotAuthenticated, authController.signUp)
    .post('/signout', authController.passIfAuthenticated, authController.signOut)
    .post('/signin', authController.passIfNotAuthenticated, authController.signIn);

router
    .get('/dialogs', authController.passIfAuthenticated, userController.getDialogs);

router
    .post('/message', authController.passIfAuthenticated, dialogController.addMessage);

router
    .get('/profile', authController.passIfAuthenticated, userController.getUserProfile);

router
    .post('/friend', authController.passIfAuthenticated, userController.addFriend)
    .get('/friends', authController.passIfAuthenticated, userController.getFriends);

module.exports = router;