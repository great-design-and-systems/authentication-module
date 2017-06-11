'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppLogger = require('../AppLogger');

var _AppLogger2 = _interopRequireDefault(_AppLogger);

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidatePassword = function ValidatePassword(password, hashedPassword, callback) {
    _classCallCheck(this, ValidatePassword);

    try {
        callback(_passwordHash2.default.verify(password, hashedPassword));
    } catch (err) {
        new _AppLogger2.default(err).error();
        callback(err);
    }
};

exports.default = ValidatePassword;