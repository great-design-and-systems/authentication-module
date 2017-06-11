'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UsersResource = exports.API = undefined;

var _Response = require('../../control/Response');

var _users = require('./users');

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = exports.API = '/api/users/';

var UsersResource = exports.UsersResource = function UsersResource(app) {
    _classCallCheck(this, UsersResource);

    var users = new _users2.default();
    app.get(API + 'user-profile/:username', function (req, res) {
        users.getUserProfileByUsername(req.params.username, function (err, result) {
            if (err) {
                res.status(404).send((0, _Response.NotFound)('users profile'));
            } else {
                res.status(200).send(result);
            }
        });
    });

    app.get(API + 'user-password/:username', function (req, res) {
        users.getUserPasswordByUsername(req.params.username, function (err, result) {
            if (err) {
                res.status(404).send((0, _Response.NotFound)('Password'));
            } else {
                res.status(200).send({
                    password: result.password
                });
            }
        });
    });

    app.post(API + 'register', function (req, res) {
        users.register(req.body, function (err, result) {
            (0, _Response.RegisterResponse)(req, res, err, result);
        });
    });

    app.delete(API + ':userId', function (req, res) {
        users.removeUsers(req.params.userId, function (err, result) {
            if (err) {
                res.status(500).send({
                    message: 'Failed to remove users id ' + req.params.id + '.'
                });
            } else {
                res.status(200).send(result);
            }
        });
    });

    app.put(API + 'change-password/:username', function (req, res) {
        users.changePassword(req.params.username, req.body.password, function (err) {
            if (!err) {
                res.status(200).send({
                    message: 'ok'
                });
            } else {
                res.status(500).send(err);
            }
        });
    });

    app.put(API + 'update-profile/:username', function (req, res) {
        users.updateProfile(req.params.username, req.body, function (err) {
            if (!err) {
                res.status(200).send({
                    message: 'ok'
                });
            } else {
                res.status(500).send(err);
            }
        });
    });
};