import AppLogger from '../AppLogger';
import User from '../../entity/User';
import UserProfile from '../../entity/UserProfile';

export default class GetUserProfileByUsername {
    constructor(username, callback) {
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
                    UserProfile.findOne({
                        userId: result._id
                    }, (err, userProfileResult) => {
                        if (err) {
                            new AppLogger(err).error();
                            callback({
                                message: 'User profile not found'
                            });
                        } else {
                            userProfileResult._id = undefined;
                            userProfileResult.userId = undefined;
                            callback(undefined, userProfileResult);
                        }
                    });
                } catch (errProfile) {
                    new AppLogger(err).error();
                    callback({
                        message: 'User profile not found'
                    });
                }
            }
        });
    }
}