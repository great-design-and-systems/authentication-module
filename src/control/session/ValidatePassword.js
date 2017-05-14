import AppLogger from '../AppLogger';
import passwordHash from 'password-hash';

export default class ValidatePassword {
    constructor(password, hashedPassword, callback) {
        try {
            callback(passwordHash.verify(password, hashedPassword));
        } catch (err) {
            new AppLogger(err).error();
            callback(err);
        }
    }
}