import AppLogger from '../AppLogger';
import User from '../../entity/User';
import UserProfile from '../../entity/UserProfile';

export default class UpdateProfile {
    constructor(username, data, callback) {
        User.findOne({
            username: username
        }, (err, result) => {
            if (err) {
                new AppLogger(err).error();
                callback({
                    message: 'User not found.'
                });
            } else {
                try {
                    UserProfile.findOneAndUpdate({
                        userId: result._id
                    }, data, (err) => {
                        if (err) {
                            new AppLogger(err).error();
                            callback({
                                message: 'User profile update failed.'
                            });
                        } else {
                            callback();
                        }
                    });
                } catch (errProfile) {
                    new AppLogger(errProfile).error();
                    callback({
                        message: 'User profile update failed.'
                    });
                }
            }
        });
    }
}