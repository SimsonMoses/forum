import jwt from "jsonwebtoken";
import {handleResponse} from "../util/response.js";


export const validateToken = (req, res,roleRestriction, next) => {
    // console.log('validateToken', req.headers);
    const authHeader = req.headers.authorization;
    if (!authHeader) return handleResponse(res, 401, 'Authentication required');
    const token = authHeader.split(' ')[1];
    if (!token) return handleResponse(res, 401, 'No token provided');

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        if(roleRestriction && !isUserAllowedToAccess(req,roleRestriction)){
            return handleResponse(res, 403, 'User not Allowed To Access');
        }
        next();
    } catch (error) {
        console.log(`validate token error: ${error}`);
        return handleResponse(res, 401, 'Invalid token');
    }
}

const isUserAllowedToAccess = (req,roleRestriction)=>{
    let userRole = req.user?.role;
    console.log(userRole)
    console.log(roleRestriction.includes(userRole))
    return roleRestriction.includes(userRole);
}