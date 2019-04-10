"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var registerValidation = function registerValidation(payload) {
  var errors = {};
  var emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  var passRegex = /^\S{8,20}$/;
  var userRegex = /^(?=.{5,20}$)(?!.*[_.\-]{2})[a-zA-Z0-9._\-]+$/;
  var isValid = true;

  if (!payload.email || !emailRegex.test(payload.email)) {
    errors.email = 'Please, provide a valid email address';
    isValid = false;
  }

  if (!payload.username || !userRegex.test(payload.username)) {
    errors.username = 'Please, provide a valid username. 5 - 20 characters, [._-] digits and letters';
    isValid = false;
  }

  if (!payload.password || !passRegex.test(payload.password)) {
    errors.password = 'Please, provide a password between 8 and 20 characters';
    isValid = false;
  }

  if (!payload.first_name) {
    errors.first_name = 'Please, provide your first name';
    isValid = false;
  }

  if (!payload.last_name) {
    errors.last_name = 'Please, provide your last name';
    isValid = false;
  }

  return {
    success: isValid,
    message: isValid ? '' : 'The form contains some errors. Please fix it',
    errors: errors
  };
};

router.post('/register', function (req, res) {
  var validation = registerValidation(req.body);

  if (!validation.success) {
    res.json(validation);
  }

  res.send('Validation passes');
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=RegisterRouter.js.map