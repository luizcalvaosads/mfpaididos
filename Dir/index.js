"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express); 
var _routesjs = require('./routes.js'); var _routesjs2 = _interopRequireDefault(_routesjs);
require('./db/connection.js');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);

const app = _express2.default.call(void 0, ); 
const port = 8080; 

app.use(_cors2.default.call(void 0, ))
app.use(_express2.default.json());
app.use(_routesjs2.default)

app.listen(process.env.PORT || port, () => console.log("> server is running"));
