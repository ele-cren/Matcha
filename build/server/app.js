"use strict";

var _server = _interopRequireDefault(require("./server"));

var _api = _interopRequireDefault(require("./api/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = new _server["default"]();
server.start();
var api = new _api["default"](server.app);
api.setRoutes();
process.on('SIGINT', function () {
  server.stop();
  process.exit(0);
});
//# sourceMappingURL=app.js.map