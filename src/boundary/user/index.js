import { NotFound, RegisterResponse } from '../../control/Response';

import Users from './Users';

export const API = '/api/users/';

export class UserResponse {
    constructor(app) {
        app.get(API + 'user-profile/:username', (req, res) => {
            User.getUserProfileByUsername(req.params.username, (err, result) => {
                if (err) {
                    res.status(404).send(NotFound('User profile'));
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.get(API + 'user-password/:username', (req, res) => {
            User.getUserPasswordByUsername(req.params.username, (err, result) => {
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
            User.register(req.body, (err, result) => {
                new getRegisterResponse(req, res, err, result);
            });
        });

        app.delete(API + ':userId', (req, res) => {
            User.removeUser(req.params.userId, (err, result) => {
                if (err) {
                    res.status(500).send({
                        message: 'Failed to remove user id ' + req.params.id + '.'
                    });
                } else {
                    res.status(200).send(result);
                }
            });
        });

        app.put(API + 'change-password/:username', (req, res) => {
            User.changePassword(req.params.username, req.body.password, (err) => {
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
            User.updateProfile(req.params.username, req.body, (err) => {
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