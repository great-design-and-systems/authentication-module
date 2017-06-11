'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SessionsResource = exports.API = undefined;

var _Response = require('../../control/Response');

var _Sessions = require('./Sessions');

var _Sessions2 = _interopRequireDefault(_Sessions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = exports.API = '/api/security/';

var SessionsResource = exports.SessionsResource = function SessionsResource(app) {
    _classCallCheck(this, SessionsResource);

    var sessions = new _Sessions2.default();
    app.get(API + 'validate-host/:host', function (req, res) {
        sessions.validateHost(req.params.host, function (err, result) {
            if (err) {
                res.status(403).send((0, _Response.SecurityCodeResponse)(403));
            } else {
                res.status(200).send({
                    message: 'ok',
                    result: result
                });
            }
        });
    });
    app.post(API + 'validate-password', function (req, res) {
        sessions.validatePassword(req.body, function (err) {
            if (err) {
                res.status(401).send({ message: 'Invalid password.' });
            } else {
                res.status(200).send({
                    message: 'ok'
                });
            }
        });
    });
    app.post(API + 'create-user-session', function (req, res) {
        sessions.createUserSession(req.body.username, function (err, result) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({
                    sessionId: result
                });
            }
        });
    });
    app.get(API + 'validate-session/:sessionId', function (req, res) {
        sessions.validateSession(req.params.sessionId, function (err) {
            if (err) {
                //res.status(401).send(new SecurityException(401));
                res.status(401).send({ message: 'Invalid session.' });
            } else {
                res.status(200).send({
                    message: 'ok'
                });
            }
        });
    });
};