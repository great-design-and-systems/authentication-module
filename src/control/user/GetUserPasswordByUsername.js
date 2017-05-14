import AppLogger from '../AppLogger';
import User from '../../entity/User';

export default class GetUserPasswordByUsername {
    constructor(username, callback) {
        User.findOne({ username: username }, (err, result) => {
            try {
                if (err) {
                    new AppLogger(err).error();
                    callback({
                        message: 'Password not found.'
                    });
                } else {
                    callback(undefined, { password: result.password });
                }
            } catch (error) {
                new AppLogger(error).error();
                callback({
                    message: 'Password not found'
                });
            }
        });
    }
}