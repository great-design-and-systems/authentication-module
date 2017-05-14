import User from '../../entity/User';

export default class ValidateUser {
    constructor(username, callback) {
        User.findOne({
            username: username
        }, (err, user) => {
            if (user === null) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
}
