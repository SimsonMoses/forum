import {
    createForum,
    getAllForum,
    getAllForumByCategory,
    updateForumCategory,
    deleteForum,
    getForumById
} from '../controller/forumcontroller.js'
import {parseJson} from '../util/parseJson.js';
import {handleResponse} from "../util/response.js";
import {validateToken} from "../middleware/Authentication.js";

export const forumRoute = async (req, res) => {
    try {
        if (req.method === 'POST' && req.url === '/api/forum') {
            validateToken(req,res,'',()=> createForum(req, res))
        } else if (req.method === 'GET' && req.url.startsWith('/api/forum')) {
            getAllForum(req, res)
        } else if (req.method === 'GET' && req.url === '/api/forum/category') {
            getAllForumByCategory(req, res);
        } else if (req.method === 'PUT' && req.url === '/api/forum') {
            updateForumCategory(req, res)
        } else if (req.method === 'DELETE' && req.url.match('\/api\/forum\/([0-9]+)')) {
            deleteForum(req, res)
        } else if (req.method === 'GET' && req.url.match('\/api\/forum\/([0-9]+)')) {
            getForumById(req, res)
        } else {
            handleResponse(res, 404, 'Not found')
        }
    } catch (err) {
        console.log(`Forum Route Error Occured: ${err}`);
    }
}