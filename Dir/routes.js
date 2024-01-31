"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _taskjs = require('./db/models/task.js');
var _userjs = require('./db/models/user.js');
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _tokenjs = require('./db/auth/token.js');
var _verifyTokenjs = require('./db/middlewares/verifyToken.js');
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const routes = _express.Router.call(void 0, );

const get_user = async (req) => {
    const token = req.headers.authorization; 
    const { id } = _jsonwebtoken2.default.decode(token); 
    const user = await _userjs.userModel.findById(id);

    return user; 
}

routes.get("/", (req, res) => {
    res.send("hello world1")
})

routes.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await _userjs.userModel.findOne({ email }); 

    if (!user) {
        return res.json({ message: "Usuario Não existe" })
    }

    const passwordIsValid = await _bcrypt2.default.compare(password, user.password);
    
    if (!passwordIsValid) {
        return res.json({ message: "Senha Invalida" })
    }

    return res.json({ token: _tokenjs.generate.call(void 0, user._id) });
});


routes.post("/user" , async (req, res) => {
    const { email, password, username, office } = req.body;

    const usernameIsInUse = await _userjs.userModel.findOne({ username });
    const emailIsInUse = await _userjs.userModel.findOne({ email });

    if (usernameIsInUse || emailIsInUse) {
        return res.json({ message: "Erro Usuario Ja Cadastrado" })
    }

    const passwordHashed = await _bcrypt2.default.hash(password, 10);
    const user = await _userjs.userModel.create({ email, password: passwordHashed, username, office });

    return res.json(user)
}); 

// Protected Routes
routes.use(_verifyTokenjs.tokenVerification);

routes.post("/task", async (req, res) => {
    const { title, description, priority } = req.body; 
    const user = await get_user(req);

    const task = { 
        title, 
        description, 
        checked: false, 
        priority, 
        owner: user.username 
    };

    await _taskjs.taskModel.create(task);
    res.json({ data: "task created" });
});

routes.get("/task", (async (req, res) => {
    const tasks = await _taskjs.taskModel.find(); 
    res.json({ tasks });
}));

routes.get("/task/:id", async (req, res) => {
    const { id } = req.params; 

    const task = await _taskjs.taskModel.findById(id);

    return res.json({ task });
})

routes.put("/task/:id", (async (req, res) => {
    const { id } = req.params; 
    const { checked } = req.body; 

    await _taskjs.taskModel.findByIdAndUpdate(id, {
        checked
    });

    return res.json({ message: "updated" });
})); 

routes.delete("/task/:id", (async (req, res) => {
    const { id } = req.params;     
    await _taskjs.taskModel.findByIdAndDelete(id)

    return res.json({ message: "updated" });
})); 


exports. default = routes;
