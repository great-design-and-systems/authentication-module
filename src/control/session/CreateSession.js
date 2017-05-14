
const SECRET_KEY = process.env.SECRET_KEY || 'default';

import AppLogger from '../AppLogger';
import Session from '../../entity/Session';
import jwt from 'jsonwebtoken';

export default class CreateSession {
    constructor(username, callback) {
        const token = jwt.sign(username, SECRET_KEY);
        Session.create({ sessionId: token, username: username }, (err, result) => {
            if (err) {
                new AppLogger(err).error();
                callback({
                    message: 'Failed to create session for ' + username
                });
            } else {
                callback(null, result);
            }
        });
    }
}