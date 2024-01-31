"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _mongoose = require('mongoose'); 

const taskSchema = new (0, _mongoose.Schema)({
    title: String,
    description: String,
    checked: Boolean,
    priority: String, 
    owner: String
}); 

const taskModel = _mongoose.model.call(void 0, 'task', taskSchema); 

exports.taskModel = taskModel;
