import express from "express"; 
import routes from "./routes.js";
import "./db/connection.js";
import cors from 'cors';

const app = express(); 
const port = 8080; 

app.use(cors())
app.use(express.json());
app.use(routes)

app.listen(process.env.PORT || port, () => console.log("> server is running"));
