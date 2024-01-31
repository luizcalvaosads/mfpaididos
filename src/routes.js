import { Router } from "express";
import { taskModel } from "./db/models/task.js";
import { userModel } from "./db/models/user.js";
import bcrypt from "bcrypt";
import { generate } from "./db/auth/token.js";
import { tokenVerification } from "./db/middlewares/verifyToken.js";
import jwt from 'jsonwebtoken'

const routes = Router();

const get_user = async (req) => {
    const token = req.headers.authorization; 
    const { id } = jwt.decode(token); 
    const user = await userModel.findById(id);

    return user; 
}

routes.get("/", (req, res) => {
    res.send("hello world1")
})

routes.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }); 

    if (!user) {
        return res.json({ message: "Usuario Não existe" }).status(404)
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    
    if (!passwordIsValid) {
        return res.json({ message: "Senha Invalida" }).status(404)
    }

    return res.json({ token: generate(user._id) });
});


routes.post("/user" , async (req, res) => {
    const { email, password, username, office } = req.body;

    const usernameIsInUse = await userModel.findOne({ username });
    const emailIsInUse = await userModel.findOne({ email });

    console.log(await userModel.find());

    if (usernameIsInUse || emailIsInUse) {
        return res.json({ message: "Erro Usuario Ja Cadastrado" })
    }

    const passwordHashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({ email, password: passwordHashed, username, office });

    return res.json(user)
}); 

// Protected Routes
routes.use(tokenVerification);

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

    await taskModel.create(task);
    res.json({ data: "task created" });
});

routes.get("/task", (async (req, res) => {
    const tasks = await taskModel.find(); 
    res.json({ tasks });
}));

routes.get("/task/:id", async (req, res) => {
    const { id } = req.params; 

    const task = await taskModel.findById(id);

    return res.json({ task });
})

routes.put("/task/:id", (async (req, res) => {
    const { id } = req.params; 
    const { checked } = req.body; 

    await taskModel.findByIdAndUpdate(id, {
        checked
    });

    return res.json({ message: "updated" });
})); 

routes.delete("/task/:id", (async (req, res) => {
    const { id } = req.params;     
    await taskModel.findByIdAndDelete(id)

    return res.json({ message: "updated" });
})); 


export default routes;
