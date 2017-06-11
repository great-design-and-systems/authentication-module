import {
    GDSDomainDTO,
    GDSDomainPaginateHelper,
} from 'gds-config';
import { API as SESSION_API, SessionsResource } from './session/';
import { API as USER_API, UsersResource } from './user/';

const protocol = (req) => {
    return req.connection.encrypted ? 'https://' : 'http://'
};

export default class AuthenticationResource {
    constructor(app) {
        new UsersResource(app);
        new SessionsResource(app);

        app.get('/', (req, res) => {
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