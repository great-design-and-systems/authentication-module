import { InvalidEmail, InvalidUser } from '../../control/Response';

import AppLogger from '../../control/AppLogger';
import ChangePassword from '../../control/user/ChangePassword';
import CreateUser from '../../control/user/CreateUser';
import CreateUserProfile from '../../control/user-profile/CreateUserProfile';
import DeleteUser from '../../control/user/DeleteUser';
import DeleteUserProfileByUserId from '../../control/user-profile/DeleteUserProfileByUserId';
import GetUserPasswordByUsername from '../../control/user/GetUserPasswordByUsername';
import GetUserProfileByUsername from '../../control/user-profile/GetUserProfileByUsername';
import UpdateProfile from '../../control/user-profile/UpdateProfile';
import ValidateEmail from '../../control/user/ValidateEmail';
import ValidateUser from '../../control/user/ValidateUser';

export default class Users {
    register(registrationForm, callback) {
        let username = registrationForm.username;
        let email = registrationForm.email;
        new ValidateUser(username, (validUsername) => {
            if (validUsername) {
                new ValidateEmail(email, (validEmail) => {
                    if (validEmail) {
                        new CreateUser({
                            username: registrationForm.username,
                            password: registrationForm.password,
                            email: registrationForm.email
                        }, (err, userResult) => {
                            if (err) {
                                new AppLogger(err).error();
                                callback(err);
                            } else {
                                new CreateUserProfile({
                                    userId: userResult._id,
                                    firstname: registrationForm.firstname,
                                    lastname: registrationForm.lastname
                                }, (errProfile) => {
                                    if (errProfile) {
                                        new AppLogger(errProfile).error();
                                        callback(errProfile);
                                    } else {
                                        callback(undefined, {
                                            username: userResult.username,
                                            userId: userResult._id
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        callback(InvalidEmail());
                    }
                });
            } else {
                callback(InvalidUser());
            }
        });
    }
    getUserProfileByUsername(username, callback) {
        new GetUserProfileByUsername(username, (err, result) => {
            if (err) {
                new AppLogger(err).error();
                callback(err);
            } else {
                callback(undefined, result);
            }
        });
    }
    removeUser(userId, callback) {
        new DeleteUserProfileByUserId(userId, (err) => {
            if (!err) {
                new DeleteUser(userId, (err) => {
                    if (!err) {
                        callback(undefined, {
                            message: 'User has been removed.'
                        });
                    } else {
                        new AppLogger(err).error();
                        callback(err);
                    }
                });
            } else {
                new AppLogger(err).error();
                callback(err);
            }
        });
    }

    getUserPasswordByUsername(username, callback) {
        new GetUserPasswordByUsername(username, callback);
    }

    updateProfile(username, data, callback) {
        new UpdateProfile(username, data, callback);
    }
    changePassword(username, password, callback) {
        new ChangePassword(username, password, callback);
    }
}