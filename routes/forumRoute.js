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
import {requestToJoinForum} from "../controller/member-request-controller.js";

export const forumRoute = async (req, res) => {
    try {
        if (req.method === 'POST' && req.url === '/api/forum') {
            validateToken(req, res, 'admin', () => createForum(req, res));
        } else if (req.method === 'GET' && req.url.startsWith('/api/forum')) {
            validateToken(req, res, '', () => getAllForum(req, res));
        } else if (req.method === 'GET' && req.url === '/api/forum/category') {
            validateToken(req, res, '', () => getAllForumByCategory(req, res));
        } else if (req.method === 'PUT' && req.url === '/api/forum') {
            validateToken(req, res, '', () => updateForumCategory(req, res));
        } else if (req.method === 'DELETE' && req.url.match('\/api\/forum\/([0-9]+)')) {
            validateToken(res, req, '', () => deleteForum(req, res));
        } else if (req.method === 'GET' && req.url.match('\/api\/forum\/([0-9]+)')) {
            validateToken(res, req, '', () => getForumById(req, res));
        } else if (req.method === 'POST' && req.url.match('\/api\/forum\/join\/')) {
            validateToken(req,res,'',()=>requestToJoinForum(req,res));
        }else {
            handleResponse(res, 404, 'Not found')
        }
    } catch (err) {
        console.log(`Forum Route Error Occurred: ${err}`);
        handleResponse(res, 500, 'forumRouteError', null)
    }
}