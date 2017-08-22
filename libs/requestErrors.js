'use strict';

const httpStatusCodes = require('http-status-codes');

class RequestError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

class BadRequestError extends RequestError {
    constructor(message) {
        super(message, httpStatusCodes.BAD_REQUEST);
    }
}

class NotFoundError extends RequestError {
    constructor(message) {
        super(message, httpStatusCodes.NOT_FOUND);
    }
}

module.exports = {
    BadRequestError, NotFoundError
};