import { Schema, model } from 'mongoose';

const UserProfileSchema = Schema({
    userId: {
        type: String,
        required: [true, 'User Id is required.']
    },
    firstname: {
        type: String,
        required: [true, 'firstname is required.']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required.']
    },
    avatarId: String,
    createdOn: { type: Date, default: Date.now }
});
const UserProfile = model('userProfile', UserProfileSchema);

export default UserProfile;