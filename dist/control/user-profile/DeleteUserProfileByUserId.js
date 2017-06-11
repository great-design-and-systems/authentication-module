'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppLogger = require('../AppLogger');

var _AppLogger2 = _interopRequireDefault(_AppLogger);

var _UserProfile = require('../../entity/UserProfile');

var _UserProfile2 = _interopRequireDefault(_UserProfile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DeleteUserProfileByUserId = function DeleteUserProfileByUserId(userId, callback) {
    _classCallCheck(this, DeleteUserProfileByUserId);

    _UserProfile2.default.remove({
        userId: userId
    }, function (err, result) {
        if (err) {
            new _AppLogger2.default(err).error();
            callback({
                message: 'Failed to delete user profile ' + userId
            });
        } else {
            callback(null, result);
        }
    });
};

exports.default = DeleteUserProfileByUserId;