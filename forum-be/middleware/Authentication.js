import jwt from "jsonwebtoken";
import {handleResponse} from "../util/response.js";


export const validateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return handleResponse(res, 401, 'Authentication required');
    const token = authHeader.split(' ')[1];
    if (!token) return handleResponse(res, 401, 'No token provided');
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        handleResponse(res, 401, 'Invalid token');
    }
}