import { NotFound, RegisterResponse } from '../../control/Response';

import Users from './users';

export const API = '/api/users/';

export class UsersResource {
    constructor(app) {
        const users = new Users();
        app.get(API + 'user-profile/:username', (req, res) => {
            users.getUserProfileByUsername(req.params.username, (err, result) => {
                if (err) {
                    res.status(404).send(NotFound('users profile'));
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get(API + 'user-password/:username', (req, res) => {
            users.getUserPasswordByUsername(req.params.username, (err, result) => {
                if (err) {
                    res.status(404).send(NotFound('Password'));
                } else {
                    res.status(200).send({
                        password: result.password
                    });
                }
            });
        });

        app.post(API + 'register', (req, res) => {
            users.register(req.body, (err, result) => {
                RegisterResponse(req, res, err, result);
            });
        });

        app.delete(API + ':userId', (req, res) => {
            users.removeUsers(req.params.userId, (err, result) => {
                if (err) {
                    res.status(500).send({
                        message: 'Failed to remove users id ' + req.params.id + '.'
                    });
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.put(API + 'change-password/:username', (req, res) => {
            users.changePassword(req.params.username, req.body.password, (err) => {
                if (!err) {
                    res.status(200).send({
                        message: 'ok'
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        });

        app.put(API + 'update-profile/:username', (req, res) => {
            users.updateProfile(req.params.username, req.body, (err) => {
                if (!err) {
                    res.status(200).send({
                        message: 'ok'
                    });
                } else {
                    res.status(500).send(err);
                }
            });
        });
    }
}