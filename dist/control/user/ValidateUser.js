'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _User = require('../../entity/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidateUser = function ValidateUser(username, callback) {
    _classCallCheck(this, ValidateUser);

    _User2.default.findOne({
        username: username
    }, function (err, user) {
        if (user === null) {
            callback(true);
        } else {
            callback(false);
        }
    });
};

exports.default = ValidateUser;