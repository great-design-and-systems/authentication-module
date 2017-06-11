'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CreateSession = require('../../control/session/CreateSession');

var _CreateSession2 = _interopRequireDefault(_CreateSession);

var _ValidateHost = require('../../control/session/ValidateHost');

var _ValidateHost2 = _interopRequireDefault(_ValidateHost);

var _ValidatePassword = require('../../control/session/ValidatePassword');

var _ValidatePassword2 = _interopRequireDefault(_ValidatePassword);

var _ValidateSession = require('../../control/session/ValidateSession');

var _ValidateSession2 = _interopRequireDefault(_ValidateSession);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sessions = function () {
    function Sessions() {
        _classCallCheck(this, Sessions);
    }

    _createClass(Sessions, [{
        key: 'validateHost',
        value: function validateHost(clientHost, callback) {
            new _ValidateHost2.default(clientHost, callback);
        }
    }, {
        key: 'validatePassword',
        value: function validatePassword(data, callback) {
            var password = data.password;
            var userPassword = data.currentPassword;
            new _ValidatePassword2.default(password, userPassword, function (result) {
                if (result) {
                    callback(undefined, true);
                } else {
                    callback(true);
                }
            });
        }
    }, {
        key: 'createUserSession',
        value: function createUserSession(username, callback) {
            new _CreateSession2.default(username, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(null, result.sessionId);
                }
            });
        }
    }, {
        key: 'validateSession',
        value: function validateSession(sessionId, callback) {
            new _ValidateSession2.default(sessionId, callback);
        }
    }]);

    return Sessions;
}();

exports.default = Sessions;