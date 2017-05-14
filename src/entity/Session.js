import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const SessionSchema = mongoose.Schema({
    sessionId: {
        type: String,
        required: [true, 'SessionId is required.']
    },
    username: {
        type: String,
        required: [true, 'Username is required.']
    },
    createdOn: { type: Date, default: Date.now }
});
SessionSchema.plugin(mongoosePaginate);
const Session = mongoose.model('session', SessionSchema);

export default Session;