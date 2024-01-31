"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);

_mongoose2.default.connect(
  "mongodb+srv://TESTBETA:TEST@testservermf.qlr5fzf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("> Database Connected!"))
  .catch(error => console.log(error));