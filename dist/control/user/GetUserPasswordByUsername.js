'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppLogger = require('../AppLogger');

var _AppLogger2 = _interopRequireDefault(_AppLogger);

var _User = require('../../entity/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetUserPasswordByUsername = function GetUserPasswordByUsername(username, callback) {
    _classCallCheck(this, GetUserPasswordByUsername);

    _User2.default.findOne({ username: username }, function (err, result) {
        try {
            if (err) {
                new _AppLogger2.default(err).error();
                callback({
                    message: 'Password not found.'
                });
            } else {
                callback(undefined, { password: result.password });
            }
        } catch (error) {
            new _AppLogger2.default(error).error();
            callback({
                message: 'Password not found'
            });
        }
    });
};

exports.default = GetUserPasswordByUsername;