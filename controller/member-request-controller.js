import {ForumMemberRequest} from "../models/forumMemberRequest.js";
import {handleResponse} from "../util/response.js";

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