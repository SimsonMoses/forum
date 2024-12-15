import {createUser, getAllUsers, getUserProfile, loginUser, me, updateUser} from "../controller/userController.js";
import {validateToken} from "../middleware/Authentication.js";
import {handleResponse} from "../util/response.js";
import {Url} from "url";

export const userRoute = async (req, res) => {
    console.log('user routes log')
    const url = new URL(req.url, `http://${req.headers.host}`)

    if (req.method === 'POST' && req.url === '/api/user/register') {
        createUser(req, res)
    } else if (req.method === 'POST' && req.url === '/api/user/login') {
        loginUser(req, res)
    } else if (req.method === 'GET' && req.url === '/api/user/me') {
        validateToken(req, res, () => me(req, res))
    } else if (req.method === 'GET' && req.url === '/api/user/profile') {
        validateToken(req, res, () => getUserProfile(req, res))
    } else if (req.method === 'PUT' && req.url === '/api/user/profile/update') {
        validateToken(req, res, () => updateUser(req, res))
    } else if (req.method === 'GET' && url.pathname === '/api/user/profile/get-all') {
        validateToken(req, res, () => getAllUsers(req, res))
    } else {
        handleResponse(res, 404, 'Not found');
    }
}