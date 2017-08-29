'use strict';

const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/user');

router
    .post('/signup', userController.passIfNotAuthenticated, userController.signUp)
    .post('/signout', userController.passIfAuthenticated, userController.signOut)
    .post('/signin', userController.passIfNotAuthenticated, userController.signIn);

router
    .get('/profile', userController.passIfAuthenticated, userController.getUserProfile);

module.exports = router;