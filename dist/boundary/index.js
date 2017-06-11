'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthenticationResourceChain = exports.AuthenticationResource = undefined;

var _gdsConfig = require('gds-config');

var _session = require('./session/');

var _user = require('./user/');

var _fluidChains = require('fluid-chains');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var protocol = function protocol(req) {
    return req.connection.encrypted ? 'https://' : 'http://';
};

var AuthenticationResource = exports.AuthenticationResource = function AuthenticationResource(app) {
    _classCallCheck(this, AuthenticationResource);

    new _user.UsersResource(app);
    new _session.SessionsResource(app);

    app.get('/gds', function (req, res) {
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

var AuthenticationResourceChain = exports.AuthenticationResourceChain = function (_Chain) {
    _inherits(AuthenticationResourceChain, _Chain);

    function AuthenticationResourceChain() {
        _classCallCheck(this, AuthenticationResourceChain);

        var _this = _possibleConstructorReturn(this, (AuthenticationResourceChain.__proto__ || Object.getPrototypeOf(AuthenticationResourceChain)).call(this, 'AuthenticationResourceChain', function (context, param, next) {
            var domain = param.domain ? param.domain() : [];
            var host = param.host();
            var protocol = param.protocol();
            var dto = new _gdsConfig.GDSDomainDTO();
            dto.setDomainName('Authentication');
            dto.addPost('register', protocol + host + _user.API + 'register');
            dto.addGet('userProfile', protocol + host + _user.API + 'user-profile/:username');
            dto.addGet('userPassword', protocol + host + _user.API + 'user-password/:username');
            dto.addDelete('deleteUser', protocol + host + _user.API + ':userId');
            dto.addPut('changePassword', protocol + host + _user.API + 'change-password/:username');
            dto.addPut('updateProfile', protocol + host + _user.API + 'update-profile/:username');
            dto.addGet('validateHost', protocol + host + _session.API + 'validate-host/:host');
            dto.addPost('validatePassword', protocol + host + _session.API + 'validate-password');
            dto.addPost('createUserSession', protocol + host + _session.API + 'create-user-session');
            dto.addPost('validateSession', protocol + host + _session.API + 'validate-session/:sessionId');
            domain.push(dto);
            context.set('domain', domain);
            next();
        }));

        _this.addSpec('host', true);
        _this.addSpec('protocol', true);
        _this.addSpec('domain', false);
        return _this;
    }

    return AuthenticationResourceChain;
}(_fluidChains.Chain);