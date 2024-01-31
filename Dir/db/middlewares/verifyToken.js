"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _tokenjs = require('../auth/token.js');

const tokenVerification = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        _jsonwebtoken2.default.verify(authorization, _tokenjs.key);      
        next();
    } catch (error) {
        return res.json({ message: { status: 404, message: "token invalid" } });
    }
}

exports.tokenVerification = tokenVerification;
