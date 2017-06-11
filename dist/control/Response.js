'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SecurityCodeResponse = exports.RegisterResponse = exports.InvalidUser = exports.InvalidEmail = exports.NotFound = undefined;

var _gdsConfig = require('gds-config');

var NotFound = exports.NotFound = function NotFound(field) {
    return new _gdsConfig.GDSDomainDTO('NOT_FOUND_ERROR', {
        message: field + ' not found'
    });
};

var InvalidEmail = exports.InvalidEmail = function InvalidEmail() {
    return new _gdsConfig.GDSDomainDTO('INVALID_EMAIL', {
        message: 'Ivalid email'
    });
};

var InvalidUser = exports.InvalidUser = function InvalidUser() {
    return new _gdsConfig.GDSDomainDTO('INVALID_USER', {
        message: 'Ivalid user'
    });
};

var RegisterResponse = exports.RegisterResponse = function RegisterResponse(req, res, err, result) {
    if (err) {
        res.status(500).send(new _gdsConfig.GDSDomainDTO('REGISTRATION_FAILED', err.message));
    } else {
        var dto = new _gdsConfig.GDSDomainDTO('REGISTRATION_COMPLETED', {
            userId: result.userId,
            username: result.username
        });
        dto.addGet('userProfile', 'http://' + req.headers.host + 'api/users/' + 'user-profile/' + result.username);
        res.status(200).send(dto);
    }
};

var SecurityCodeResponse = exports.SecurityCodeResponse = function SecurityCodeResponse(code) {
    switch (code) {
        case 401:
            return new Error('User Authentication Failed.');
        case 403:
            return new Error('Access denied');
        case 500:
            return new Error('Failed to create user name');
    }
};