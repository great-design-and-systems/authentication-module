'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserProfileSchema = _mongoose2.default.Schema({
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
var UserProfile = _mongoose2.default.model('userProfile', UserProfileSchema);
UserProfileSchema.plugin(_mongoosePaginate2.default);
exports.default = UserProfile;