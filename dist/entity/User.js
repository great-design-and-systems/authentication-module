'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ValidateEmailFormat = require('../control/user/ValidateEmailFormat');

var _ValidateEmailFormat2 = _interopRequireDefault(_ValidateEmailFormat);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = _mongoose2.default.Schema({
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
            validator: new _ValidateEmailFormat2.default().isValid,
            messsage: "{VALUE} is not a valid email address."
        },
        require: [true, 'Email is required.']
    },
    createdOn: { type: Date, default: Date.now }
});
UserSchema.plugin(_mongoosePaginate2.default);
var User = _mongoose2.default.model('user', UserSchema);
exports.default = User;