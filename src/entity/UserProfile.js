import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const UserProfileSchema = mongoose.Schema({
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
const UserProfile = mongoose.model('userProfile', UserProfileSchema);
UserProfileSchema.plugin(mongoosePaginate);
export default UserProfile;