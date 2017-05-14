import AppLogger from '../AppLogger';
import HashPassword from './HashPassword';
import User from '../../entity/User';

export default class CreateUser {
    constructor(user, callback) {
        const hashedPassword = new HashPassword(user.password).getHashed();
        user.password = hashedPassword;
        User.create(user, (err, result) => {
            if (err) {
                new AppLogger(err).error();
                callback({
                    message: 'Failed to create user.'
                });
            } else {
                callback(null, result);
            }
        });
    }
}