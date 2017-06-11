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

var CreateUserProfile = function CreateUserProfile(userProfile, callback) {
    _classCallCheck(this, CreateUserProfile);

    _UserProfile2.default.create(userProfile, function (err, result) {
        if (err) {
            new _AppLogger2.default(err).error();
            callback({
                message: 'Failed to create user profile.'
            });
        } else {
            callback(null, result);
        }
    });
};

exports.default = CreateUserProfile;