'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _AppLogger = require('../AppLogger');

var _AppLogger2 = _interopRequireDefault(_AppLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ALLOWED_HOSTS = process.env.ALLOWED_HOSTS || 'localhost';

var ValidateHost = function ValidateHost(clientHost, callback) {
    _classCallCheck(this, ValidateHost);

    new _AppLogger2.default('Validating host: ' + clientHost).info();
    if (ALLOWED_HOSTS.includes(clientHost.split(':')[0])) {
        callback(null, { message: clientHost + ' is allowed.' });
    } else {
        callback(true, { message: clientHost + ' is not allowed.' });
    }
};

exports.default = ValidateHost;