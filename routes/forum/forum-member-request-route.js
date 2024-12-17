import {inviteMemberToForum, requestToJoinForum} from "../../controller/member-request-controller.js";
import {validateToken} from "../../middleware/Authentication.js";
import {handleResponse} from "../../util/response.js";


export const forumMemberRequestRoute = async (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    if (req.method === 'POST' && url.pathname === '/api/forum/member/request') {
        validateToken(req, res, '', () => requestToJoinForum(req, res));
    } else if (req.method === 'POST' && url.pathname === '/api/forum/member/invite'){
        validateToken(req,res,'',()=>inviteMemberToForum(req,res));
    }else {
        handleResponse(res, 404, 'Endpoint Not found', null)
    }
}