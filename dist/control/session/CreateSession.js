'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppLogger = require('../AppLogger');

var _AppLogger2 = _interopRequireDefault(_AppLogger);

var _Session = require('../../entity/Session');

var _Session2 = _interopRequireDefault(_Session);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECRET_KEY = process.env.SECRET_KEY || 'default';

var CreateSession = function CreateSession(username, callback) {
    _classCallCheck(this, CreateSession);

    var token = _jsonwebtoken2.default.sign(username, SECRET_KEY);
    _Session2.default.create({ sessionId: token, username: username }, function (err, result) {
        if (err) {
            new _AppLogger2.default(err).error();
            callback({
                message: 'Failed to create session for ' + username
            });
        } else {
            callback(null, result);
        }
    });
};

exports.default = CreateSession;