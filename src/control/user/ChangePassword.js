import AppLogger from '../AppLogger';
import HashPassword from './HashPassword';
import User from '../../entity/User';

export default class ChangePassword {
    constructor(username, password, callback) {
        const hashedPassword = new HashPassword(password).getHashed();
        User.findOneAndUpdate({
            username: username
        }, {
                password: hashedPassword
            }, (err) => {
                if (!err) {
                    callback();
                } else {
                    new AppLogger(err).error();
                    callback(err);
                }
            });
    }
}
