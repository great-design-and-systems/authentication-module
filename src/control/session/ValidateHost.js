import AppLogger from '../AppLogger';

const ALLOWED_HOSTS = process.env.ALLOWED_HOSTS || 'localhost';
export default class ValidateHost {
    constructor(clientHost, callback) {
        new AppLogger('Validating host: ' + clientHost).info();
        if (ALLOWED_HOSTS.includes(clientHost.split(':')[0])) {
            callback(null, { message: clientHost + ' is allowed.' });
        } else {
            callback(true, { message: clientHost + ' is not allowed.' });
        }
    }
}
