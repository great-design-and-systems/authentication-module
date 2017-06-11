'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppLogger = require('../AppLogger');

var _AppLogger2 = _interopRequireDefault(_AppLogger);

var _Session = require('../../entity/Session');

var _Session2 = _interopRequireDefault(_Session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidateSession = function ValidateSession(sessionId, callback) {
    _classCallCheck(this, ValidateSession);

    _Session2.default.findOne({ sessionId: sessionId }, function (err, result) {
        if (err) {
            new _AppLogger2.default(err).error();
            callback({
                message: 'Failed to get session ' + sessionId
            });
        } else {
            if (result) {
                callback(null, { message: 'sessionId found' });
            } else {
                callback(true, { message: 'sessionId not found' });
            }
        }
    });
};

exports.default = ValidateSession;