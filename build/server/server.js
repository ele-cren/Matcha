"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Server =
/*#__PURE__*/
function () {
  function Server() {
    _classCallCheck(this, Server);

    this.configure();
  }

  _createClass(Server, [{
    key: "configure",
    value: function configure() {
      this.app = (0, _express["default"])();
      this.app.use(_bodyParser["default"].urlencoded({
        extended: true
      }));
      this.app.use(_bodyParser["default"].json());
    }
  }, {
    key: "start",
    value: function start() {
      var port = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;
      this.server = this.app.listen(port);
    }
  }, {
    key: "stop",
    value: function stop() {
      this.server.close();
    }
  }]);

  return Server;
}();

var _default = Server;
exports["default"] = _default;
//# sourceMappingURL=server.js.map