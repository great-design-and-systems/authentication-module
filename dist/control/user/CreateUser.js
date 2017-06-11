'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppLogger = require('../AppLogger');

var _AppLogger2 = _interopRequireDefault(_AppLogger);

var _HashPassword = require('./HashPassword');

var _HashPassword2 = _interopRequireDefault(_HashPassword);

var _User = require('../../entity/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateUser = function CreateUser(user, callback) {
    _classCallCheck(this, CreateUser);

    var hashedPassword = new _HashPassword2.default(user.password).getHashed();
    user.password = hashedPassword;
    _User2.default.create(user, function (err, result) {
        if (err) {
            new _AppLogger2.default(err).error();
            callback({
                message: 'Failed to create user.'
            });
        } else {
            callback(null, result);
        }
    });
};

exports.default = CreateUser;