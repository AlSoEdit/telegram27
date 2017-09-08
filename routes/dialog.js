'use strict';

const { Router } = require('express');
const router = new Router();
const userController = require('../controllers/user');
const dialogController = require('../controllers/dialog');

router
    .get('/dialog/:id', userController.passIfAuthenticated, dialogController.getById)
    .get('/dialogs', userController.passIfAuthenticated, dialogController.getByUser);

router
    .post('/message', userController.passIfAuthenticated, dialogController.addMessage);

module.exports = router;