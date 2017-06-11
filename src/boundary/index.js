import {
    GDSDomainDTO,
    GDSDomainPaginateHelper,
} from 'gds-config';
import { API as SESSION_API, SessionsResource } from './session/';
import { API as USER_API, UsersResource } from './user/';

import { Chain } from 'fluid-chains';

const protocol = (req) => {
    return req.connection.encrypted ? 'https://' : 'http://'
};

export class AuthenticationResource {
    constructor(app) {
        new UsersResource(app);
        new SessionsResource(app);

        app.get('/gds', (req, res) => {
            const domain = new GDSDomainDTO();
            domain.addPost('register', protocol(req) + req.headers.host + USER_API + 'register');
            domain.addGet('userProfile', protocol(req) + req.headers.host + USER_API + 'user-profile/:username');
            domain.addGet('userPassword', protocol(req) + req.headers.host + USER_API + 'user-password/:username');
            domain.addDelete('deleteUser', protocol(req) + req.headers.host + USER_API + ':userId');
            domain.addPut('changePassword', protocol(req) + req.headers.host + USER_API + 'change-password/:username');
            domain.addPut('updateProfile', protocol(req) + req.headers.host + USER_API + 'update-profile/:username');
            domain.addGet('validateHost', protocol(req) + req.headers.host + SESSION_API + 'validate-host/:host');
            domain.addPost('validatePassword', protocol(req) + req.headers.host + SESSION_API + 'validate-password');
            domain.addPost('createUserSession', protocol(req) + req.headers.host + SESSION_API + 'create-user-session');
            domain.addPost('validateSession', protocol(req) + req.headers.host + SESSION_API + 'validate-session/:sessionId');
            res.status(200).send(domain);
        });
    }
}

export class AuthenticationResourceChain extends Chain {
    constructor() {
        super('AuthenticationResourceChain', (context, param, next) => {
            const domain = param.domain();
            const host = param.host();
            const protocol = param.protocol();
            domain.addPost('register', protocol + host + USER_API + 'register');
            domain.addGet('userProfile', protocol + host + USER_API + USER_API + 'user-profile/:username');
            domain.addGet('userPassword', protocol + host + USER_API + USER_API + 'user-password/:username');
            domain.addDelete('deleteUser', protocol + host + USER_API + USER_API + ':userId');
            domain.addPut('changePassword', protocol + host + USER_API + USER_API + 'change-password/:username');
            domain.addPut('updateProfile', protocol + host + USER_API + USER_API + 'update-profile/:username');
            domain.addGet('validateHost', protocol + host + USER_API + SESSION_API + 'validate-host/:host');
            domain.addPost('validatePassword', protocol + host + USER_API + SESSION_API + 'validate-password');
            domain.addPost('createUserSession', protocol + host + USER_API + SESSION_API + 'create-user-session');
            domain.addPost('validateSession', protocol + host + USER_API + SESSION_API + 'validate-session/:sessionId');
            context.set('domain', domain);
            context.set('host', host);
            context.set('protocol', protocol);
            next();
        });
        this.addSpec('host', true);
        this.addSpec('domain', true);
        this.addSpec('protocol', true);
    }
}

