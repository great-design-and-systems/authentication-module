import User from '../../entity/User';

export default class ValidateEmail {
    constructor(email, callback) {
        User.findOne({
            email: email
        }, (err, user) => {
            if (user === null) {
                callback(true);
            } else {
                callback(false);
            }
        });
    }
}
