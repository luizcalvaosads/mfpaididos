"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken); 

const key = "UeA6h%Nd7jEGw2iCpjdmpDk#kTBMRst4gG%C#qTufNQ8n&AZmLwQ%R^9E$C8tda^AUj&5rrP4V@hgDeYprQiGsuDMxYeFpG!z2LfoqvYPbDoFeH$rv&zaLxyu^56fjh9!9Q9nbak4$JTVC7#VV3GF@"


const generate = (idUser) => {
    const token = _jsonwebtoken2.default.sign({ id: idUser }, key);
    return token;
};

exports.generate = generate; exports.key = key;