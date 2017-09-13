'use strict';

module.exports = {
    fieldRequired: field => `${field} is required`,
    uniqueFieldAlreadyExists: value => `${value} already exists`,
    shouldNotBeEmpty: arrayName => `${arrayName} should not be empty`,
    notFound: value => `${value} not found`,
    cannotAddMessageIfNotParticipant: 'Can not add message to dialog if you not participate in it',
    cannotDeleteFriendIfNotFriends: 'Can not delete friend if not friends',
    alreadyAuthenticated: 'Already authenticated',
    wrongLoginOrPassword: 'Wrong login or password',
    notAuthenticated: 'Not authenticated',
    alreadyFriends: 'Already in friends list',
    canNotConnectToServer: 'Can not connect to server'
};