import CreateSession from '../../control/session/CreateSession';
import ValidateHost from '../../control/session/ValidateHost';
import ValidatePassword from '../../control/session/ValidatePassword';
import ValidateSession from '../../control/session/ValidateSession';

export default class Sessions {
    validateHost(clientHost, callback) {
        new ValidateHost(clientHost, callback);
    }
    
    validatePassword(data, callback) {
        let password = data.password;
        let userPassword = data.currentPassword;
        new ValidatePassword(password, userPassword, (result) => {
            if (result) {
                callback(undefined, true);
            } else {
                callback(true);
            }
        });
    }

    createUserSession(username, callback) {
        new CreateSession(username, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result.sessionId);
            }
        });
    }

    validateSession(sessionId, callback) {
        new ValidateSession(sessionId, callback);
    }
}