'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppLogger = require('../AppLogger');

var _AppLogger2 = _interopRequireDefault(_AppLogger);

var _User = require('../../entity/User');

var _User2 = _interopRequireDefault(_User);

var _UserProfile = require('../../entity/UserProfile');

var _UserProfile2 = _interopRequireDefault(_UserProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetUserProfileByUsername = function GetUserProfileByUsername(username, callback) {
    _classCallCheck(this, GetUserProfileByUsername);

    _User2.default.findOne({
        username: username
    }, function (err, result) {
        if (err) {
            new _AppLogger2.default(err).error();
            callback({
                message: 'User not found.'
            });
        } else {
            try {
                _UserProfile2.default.findOne({
                    userId: result._id
                }, function (err, userProfileResult) {
                    if (err) {
                        new _AppLogger2.default(err).error();
                        callback({
                            message: 'User profile not found'
                        });
                    } else {
                        userProfileResult._id = undefined;
                        userProfileResult.userId = undefined;
                        callback(undefined, userProfileResult);
                    }
                });
            } catch (errProfile) {
                new _AppLogger2.default(err).error();
                callback({
                    message: 'User profile not found'
                });
            }
        }
    });
};

exports.default = GetUserProfileByUsername;