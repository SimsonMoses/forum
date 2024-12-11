import { createForum,getAllForum } from '../controller/forumcontroller.js'
import { parseJson } from '../util/parseJson.js';

export const forumRoute = async (req, res) => {
    if (req.method === 'POST' && req.url === '/api/forum') {
        try {
            let body = await parseJson(req);
            createForum(req, res, body)
        } catch (error) {
            console.log(error);
        }
    }else if(req.method === 'GET' && req.url === '/api/forum'){
        getAllForum(req,res)
    } 
    else {
        res.statusCode = 404
        res.end(JSON.stringify({ "message": "Not found" }))
    }
}