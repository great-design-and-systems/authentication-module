'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gdsConfig = require('gds-config');

var _session = require('./session/');

var _user = require('./user/');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var protocol = function protocol(req) {
    return req.connection.encrypted ? 'https://' : 'http://';
};

var AuthenticationResource = function AuthenticationResource(app) {
    _classCallCheck(this, AuthenticationResource);

    new _user.UsersResource(app);
    new _session.SessionsResource(app);

    app.get('/', function (req, res) {
        var domain = new _gdsConfig.GDSDomainDTO();
        domain.addPost('register', protocol(req) + req.headers.host + _user.API + 'register');
        domain.addGet('userProfile', protocol(req) + req.headers.host + _user.API + 'user-profile/:username');
        domain.addGet('userPassword', protocol(req) + req.headers.host + _user.API + 'user-password/:username');
        domain.addDelete('deleteUser', protocol(req) + req.headers.host + _user.API + ':userId');
        domain.addPut('changePassword', protocol(req) + req.headers.host + _user.API + 'change-password/:username');
        domain.addPut('updateProfile', protocol(req) + req.headers.host + _user.API + 'update-profile/:username');
        domain.addGet('validateHost', protocol(req) + req.headers.host + _session.API + 'validate-host/:host');
        domain.addPost('validatePassword', protocol(req) + req.headers.host + _session.API + 'validate-password');
        domain.addPost('createUserSession', protocol(req) + req.headers.host + _session.API + 'create-user-session');
        domain.addPost('validateSession', protocol(req) + req.headers.host + _session.API + 'validate-session/:sessionId');
        res.status(200).send(domain);
    });
};

exports.default = AuthenticationResource;