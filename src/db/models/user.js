import { Schema, model } from "mongoose"; 

const userSchema = new Schema({
    username: String,
    email: String,
    password: String, 
    office: String
}); 

const userModel = model('user', userSchema); 

export { userModel };
