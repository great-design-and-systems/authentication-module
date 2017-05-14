import AppLogger from '../AppLogger';
import UserProfile from '../../entity/UserProfile';

export default class CreateUserProfile {
    constructor(userProfile, callback) {
        UserProfile.create(userProfile, (err, result) => {
            if (err) {
                new AppLogger(err).error();
                callback({
                    message: 'Failed to create user profile.'
                });
            } else {
                callback(null, result);
            }
        });
    }
}