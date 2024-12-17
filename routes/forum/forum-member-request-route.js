import {requestToJoinForum} from "../../controller/member-request-controller.js";
import {validateToken} from "../../middleware/Authentication.js";


export const forumMemberRequestRoute = async (req,res) =>{
    const url = new URL(req.url);
    if(req.method === 'GET' && url.pathname === '/api/forum/member/request'){
        validateToken(req,res,'',()=>requestToJoinForum(req,res));
    }
}