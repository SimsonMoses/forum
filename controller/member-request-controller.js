import {ForumMemberRequest} from "../models/forumMemberRequest.js";
import {handleResponse} from "../util/response.js";
import {parseJson} from "../util/parseJson.js";

export const requestToJoinForum = async (req, res) => {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`)
        const userId = req.user.id;
        const {forumId} = Object.fromEntries(url.searchParams.entries())
        // todo: member exist in the group
        // todo: validate whether the user already request or invited by admin
        let isMemberRequest = await ForumMemberRequest.findOne({
            userId: userId,
            forumId: forumId
        });
        console.log(isMemberRequest)
        if (isMemberRequest) return handleResponse(res, 409, `User already ${isMemberRequest.requestType}`)
        const memberRequest = await ForumMemberRequest.create({
            userId: userId,
            forumId: forumId,
            requestType: 'requested'
        });
        return handleResponse(res, 201, 'request sent success', memberRequest);
    } catch (error) {
        console.log(`Error occurred: ${error}`);
        if (error.code === 11000) {

            let message = "A request with this user and forum already exists.";// Optional: provides which key caused the conflict
            let detail = error.keyValue
            return handleResponse(res, 409, message, detail)
        }
        handleResponse(res, 500, 'unable to request ', null)
    }
}

// todo: invite member to join the forum
export const inviteMemberToForum = async (req,res)=>{
    try{
        const {userId,forumId} = await parseJson(req)
        //todo: need to valiat whether user is admin of group
        //todo: check whether userid is member of group
        //todo: userId already requested
        let isUserExist = await ForumMemberRequest.findOne({userId,forumId})
        if(isUserExist) return handleResponse(res, 409, `User already ${isUserExist.requestType}`)
        const memberInvite = await ForumMemberRequest.create({
            userId:userId,
            forumId:forumId,
            requestType: 'invited',
        })
        return handleResponse(res, 201, 'invite sent successfully', memberInvite);
    }catch (error) {
        console.log(`Error occurred: ${error}`);
        if (error.code === 11000) {
            return handleResponse(res,'User might already requested or invited')
        }
        handleResponse(res, 500, 'unable to invite sent successfully', error)
    }
}


// todo: getAll member not joined | request forum
