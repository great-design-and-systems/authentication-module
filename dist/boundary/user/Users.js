'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Response = require('../../control/Response');

var _AppLogger = require('../../control/AppLogger');

var _AppLogger2 = _interopRequireDefault(_AppLogger);

var _ChangePassword = require('../../control/user/ChangePassword');

var _ChangePassword2 = _interopRequireDefault(_ChangePassword);

var _CreateUser = require('../../control/user/CreateUser');

var _CreateUser2 = _interopRequireDefault(_CreateUser);

var _CreateUserProfile = require('../../control/user-profile/CreateUserProfile');

var _CreateUserProfile2 = _interopRequireDefault(_CreateUserProfile);

var _DeleteUser = require('../../control/user/DeleteUser');

var _DeleteUser2 = _interopRequireDefault(_DeleteUser);

var _DeleteUserProfileByUserId = require('../../control/user-profile/DeleteUserProfileByUserId');

var _DeleteUserProfileByUserId2 = _interopRequireDefault(_DeleteUserProfileByUserId);

var _GetUserPasswordByUsername = require('../../control/user/GetUserPasswordByUsername');

var _GetUserPasswordByUsername2 = _interopRequireDefault(_GetUserPasswordByUsername);

var _GetUserProfileByUsername = require('../../control/user-profile/GetUserProfileByUsername');

var _GetUserProfileByUsername2 = _interopRequireDefault(_GetUserProfileByUsername);

var _UpdateProfile = require('../../control/user-profile/UpdateProfile');

var _UpdateProfile2 = _interopRequireDefault(_UpdateProfile);

var _ValidateEmail = require('../../control/user/ValidateEmail');

var _ValidateEmail2 = _interopRequireDefault(_ValidateEmail);

var _ValidateUser = require('../../control/user/ValidateUser');

var _ValidateUser2 = _interopRequireDefault(_ValidateUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Users = function () {
    function Users() {
        _classCallCheck(this, Users);
    }

    _createClass(Users, [{
        key: 'register',
        value: function register(registrationForm, callback) {
            var username = registrationForm.username;
            var email = registrationForm.email;
            new _ValidateUser2.default(username, function (validUsername) {
                if (validUsername) {
                    new _ValidateEmail2.default(email, function (validEmail) {
                        if (validEmail) {
                            new _CreateUser2.default({
                                username: registrationForm.username,
                                password: registrationForm.password,
                                email: registrationForm.email
                            }, function (err, userResult) {
                                if (err) {
                                    new _AppLogger2.default(err).error();
                                    callback(err);
                                } else {
                                    new _CreateUserProfile2.default({
                                        userId: userResult._id,
                                        firstname: registrationForm.firstname,
                                        lastname: registrationForm.lastname
                                    }, function (errProfile) {
                                        if (errProfile) {
                                            new _AppLogger2.default(errProfile).error();
                                            callback(errProfile);
                                        } else {
                                            callback(undefined, {
                                                username: userResult.username,
                                                userId: userResult._id
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            callback((0, _Response.InvalidEmail)());
                        }
                    });
                } else {
                    callback((0, _Response.InvalidUser)());
                }
            });
        }
    }, {
        key: 'getUserProfileByUsername',
        value: function getUserProfileByUsername(username, callback) {
            new _GetUserProfileByUsername2.default(username, function (err, result) {
                if (err) {
                    new _AppLogger2.default(err).error();
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        }
    }, {
        key: 'removeUser',
        value: function removeUser(userId, callback) {
            new _DeleteUserProfileByUserId2.default(userId, function (err) {
                if (!err) {
                    new _DeleteUser2.default(userId, function (err) {
                        if (!err) {
                            callback(undefined, {
                                message: 'User has been removed.'
                            });
                        } else {
                            new _AppLogger2.default(err).error();
                            callback(err);
                        }
                    });
                } else {
                    new _AppLogger2.default(err).error();
                    callback(err);
                }
            });
        }
    }, {
        key: 'getUserPasswordByUsername',
        value: function getUserPasswordByUsername(username, callback) {
            new _GetUserPasswordByUsername2.default(username, callback);
        }
    }, {
        key: 'updateProfile',
        value: function updateProfile(username, data, callback) {
            new _UpdateProfile2.default(username, data, callback);
        }
    }, {
        key: 'changePassword',
        value: function changePassword(username, password, callback) {
            new _ChangePassword2.default(username, password, callback);
        }
    }]);

    return Users;
}();

exports.default = Users;