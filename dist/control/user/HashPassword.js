'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _passwordHash = require('password-hash');

var _passwordHash2 = _interopRequireDefault(_passwordHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PASSWORD_ALGO = process.env.PASSWORD_ALGO;
var PASSWORD_SALT_LENGTH = process.env.PASSWORD_SALT_LENGTH;
var PASSWORD_ITERATIONS = process.env.PASSWORD_ITERATIONS || 1;

var HashPassword = function () {
    function HashPassword(password) {
        _classCallCheck(this, HashPassword);

        this.hashedPassword = _passwordHash2.default.generate(password, getOptions());
    }

    _createClass(HashPassword, [{
        key: 'getHashed',
        value: function getHashed() {
            return this.hashedPassword;
        }
    }]);

    return HashPassword;
}();

exports.default = HashPassword;

function getOptions() {
    var options = {};
    if (PASSWORD_ALGO) {
        options.algorithm = PASSWORD_ALGO;
    }
    if (PASSWORD_SALT_LENGTH) {
        options.saltLength = PASSWORD_SALT_LENGTH;
    }
    if (PASSWORD_ITERATIONS) {
        options.iterations = PASSWORD_ITERATIONS;
    }
}