'use strict';

const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/user');

router
    .post('/signup', userController.signUp)
    .post('/signin', userController.signIn);

module.exports = router;