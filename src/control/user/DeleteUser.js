import AppLogger from '../AppLogger';
import User from '../../entity/User';

export default class DeleteUser {
    constructor(userId, callback) {
        User.findByIdAndRemove(userId, (err, result) => {
            if (err) {
                new AppLogger(err).error();
                callback({
                    message: 'Failed to delete userId ' + userId
                });
            } else {
                callback(null, result);
            }
        });
    }
}

