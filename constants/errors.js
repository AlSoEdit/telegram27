'use strict';

module.exports = {
    fieldRequired: field => `${field} is required`,
    uniqueFieldAlreadyExists: value => `${value} already exists`,
    shouldNotBeEmpty: arrayName => `${arrayName} should not be empty`,
    cannotAddMessageIfNotParticipant: 'Can not add message to dialog if you not participate in it',
    cannotDeleteFriendIfNotFriends: 'Can not delete friend if not friends'
};