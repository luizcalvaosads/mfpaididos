import jwt from "jsonwebtoken";
import { key } from "../auth/token.js";

const tokenVerification = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        jwt.verify(authorization, key);      
        next();
    } catch (error) {
        return res.json({ message: { status: 404, message: "token invalid" } });
    }
}

export { tokenVerification };
