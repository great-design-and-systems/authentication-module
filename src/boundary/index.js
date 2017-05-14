import {
    GDSDomainDTO,
    GDSDomainPaginateHelper,
} from 'gds-config';
import { API as USER_API, UserResource } from './user/';

const protocol = (req) => {
    return req.connection.encrypted ? 'https://' : 'http://'
}

export default class AuthenticationResource {
    constructor(app) {
        new UserResource(app);
        
        app.get('/', (req, res) => {
            const domain = new GDSDomainDTO();
            domain.addPost('register', protocol(req) + req.headers.host + USER_API + 'register');
            domain.addGet('userProfile', protocol(req) + req.headers.host + USER_API + 'user-profile/:username');
            domain.addGet('userPassword', protocol(req) + req.headers.host + USER_API + 'user-password/:username');
            domain.addDelete('deleteUser', protocol(req) + req.headers.host + USER_API + ':userId');
            domain.addPut('changePassword', protocol(req) + req.headers.host + USER_API + 'change-password/:username');
            domain.addPut('updateProfile', protocol(req) + req.headers.host + USER_API + 'update-profile/:username');
            res.status(200).send(domain);
        });
    }
}