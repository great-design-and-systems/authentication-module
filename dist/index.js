'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gdsConfig = require('gds-config');

var _boundary = require('./boundary/');

var _boundary2 = _interopRequireDefault(_boundary);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 5000;

new _gdsConfig.GDSDatabase().connect(function (errDB) {
    if (errDB) {
        console.error(errDB);
    } else {
        new _gdsConfig.GDSServer(app);
        new _gdsConfig.GDSUtil().getLogger(function () {
            app.listen(PORT, function () {
                global.gdsLogger.logInfo('Express is listening to port ' + PORT);
                new _boundary2.default(app);
            });
        });
    }
});

exports.default = app;