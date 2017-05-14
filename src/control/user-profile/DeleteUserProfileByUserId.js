import AppLogger from '../AppLogger';
import UserProfile from '../../entity/UserProfile';

export default class DeleteUserProfileByUserId {
    constructor(userId, callback) {
        UserProfile.remove({
            userId: userId
        }, (err, result) => {
            if (err) {
                new AppLogger(err).error();
                callback({
                    message: 'Failed to delete user profile ' + userId
                });
            } else {
                callback(null, result);
            }
        });
    }
}