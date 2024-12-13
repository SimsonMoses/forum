import { createForum, getAllForum, getAllForumByCategory, updateForumCategory, deleteForum } from '../controller/forumcontroller.js'
import { parseJson } from '../util/parseJson.js';

export const forumRoute = async (req, res) => {
    if (req.method === 'POST' && req.url === '/api/forum') {
        try {
            let body = await parseJson(req);
            createForum(req, res, body)
        } catch (error) {
            console.log(error);
        }
    } else if (req.method === 'GET' && req.url === '/api/forum') {
        getAllForum(req, res)
    } else if (req.method === 'GET' && req.url === '/api/forum/category') {
        getAllForumByCategory(req, res);
    } else if (req.method === 'PUT' && req.url === '/api/forum') {
        try {
            let body = await parseJson(req);
            updateForumCategory(req, res, body)
        } catch (error) {
            console.log(error);
        }
    } else if (req.method === 'DELETE' && req.url.match('\/api\/forum\/([0-9]+)')) {
        deleteForum(req,res)
    } else {
        res.statusCode = 404
        console.log(req.url);        
        res.end(JSON.stringify({ "message": "Not found" }))
    }
}

// } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {