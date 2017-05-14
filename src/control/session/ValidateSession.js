import AppLogger from '../AppLogger';
import Session from '../../entity/Session';

export default class ValidateSession {
    constructor(sessionId, callback) {
        Session.findOne({ sessionId: sessionId }, (err, result) => {
            if (err) {
                new AppLogger(err).error();
                callback({
                    message: 'Failed to get session ' + sessionId
                });
            } else {
                if (result) {
                    callback(null, { message: 'sessionId found' });
                } else {
                    callback(true, { message: 'sessionId not found' });
                }
            }
        });
    }
}
