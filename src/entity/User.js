import { Schema, model } from 'mongoose';

import ValidateEmailFormat from '../control/user/ValidateEmailFormat';

const UserSchema = Schema({
    username: {
        type: String,
        required: [true, 'Username is required.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    email: {
        type: String,
        validate: {
            validator: new ValidateEmailFormat().isValid,
            messsage: "{VALUE} is not a valid email address."
        },
        require: [true, 'Email is required.']
    },
    createdOn: { type: Date, default: Date.now }
});

const User = model('user', UserSchema);
export default User;