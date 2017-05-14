import ValidateEmailFormat from '../control/user/ValidateEmailFormat';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const UserSchema = mongoose.Schema({
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
UserSchema.plugin(mongoosePaginate);
const User = mongoose.model('user', UserSchema);
export default User;