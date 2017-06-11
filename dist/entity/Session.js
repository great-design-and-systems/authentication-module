'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongoosePaginate = require('mongoose-paginate');

var _mongoosePaginate2 = _interopRequireDefault(_mongoosePaginate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SessionSchema = _mongoose2.default.Schema({
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
SessionSchema.plugin(_mongoosePaginate2.default);
var Session = _mongoose2.default.model('session', SessionSchema);

exports.default = Session;