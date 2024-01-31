"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose'); 

const userSchema = new (0, _mongoose.Schema)({
    username: String,
    email: String,
    password: String, 
    office: String
}); 

const userModel = _mongoose.model.call(void 0, 'user', userSchema); 

exports.userModel = userModel;
