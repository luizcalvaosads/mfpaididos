import { Schema, model } from "mongoose"; 

const taskSchema = new Schema({
    title: String,
    description: String,
    checked: Boolean,
    priority: String, 
    owner: String
}); 

const taskModel = model('task', taskSchema); 

export { taskModel };
