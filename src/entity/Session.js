import { Schema, model } from 'mongoose';

const SessionSchema = Schema({
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

const Session = model('session', SessionSchema);

export default Session;