import { SecurityCodeResponse } from '../../control/Response';
import Sessions from './Sessions';

export const API = '/api/security/';

export class SessionsResource {
    constructor(app) {
        const sessions = new Sessions();
        app.get(API + 'validate-host/:host', (req, res) => {
            sessions.validateHost(req.params.host, (err, result) => {
                if (err) {
                    res.status(403).send(SecurityCodeResponse(403));
                } else {
                    res.status(200).send({
                        message: 'ok',
                        result: result
                    });
                }
            });
        });
        app.post(API + 'validate-password', (req, res) => {
            sessions.validatePassword(req.body, (err) => {
                if (err) {
                    res.status(401).send({ message: 'Invalid password.' });
                } else {
                    res.status(200).send({
                        message: 'ok'
                    });
                }
            });
        });
        app.post(API + 'create-user-session', (req, res) => {
            sessions.createUserSession(req.body.username, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send({
                        sessionId: result
                    });
                }
            });
        });
        app.get(API + 'validate-session/:sessionId', (req, res) => {
            sessions.validateSession(req.params.sessionId, (err) => {
                if (err) {
                    //res.status(401).send(new SecurityException(401));
                    res.status(401).send({ message: 'Invalid session.' });
                } else {
                    res.status(200).send({
                        message: 'ok'
                    });
                }
            });
        });
    }
}