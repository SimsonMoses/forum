import Forum from '../models/forum.js'
import {parseJson} from '../util/parseJson.js';
import {handleResponse} from '../util/response.js'


export const createForum = async (req, res) => {
    try {
        let body = await parseJson(req)
        const {title, creator, category, description, forumImage} = body;
        const newForum = await Forum.create({title, creator, category, description, forumImage});
        handleResponse(res, 201, "Created Successfully", newForum._id)
    } catch (err) {
        console.log(`Error Occured: ${err}`);
        handleResponse(res, 500, 'Service Error', null)
    }
}

export const getAllForum = async (req, res) => {
    try {
        // TODO: filter query param
        const url = new URL(req.url,`http://${req.headers.host}`)
        const {creator,category,title,limit=10,offset=0} = Object.fromEntries(url.searchParams.entries());
        const filter = {}
        if(creator) filter.creator = creator;
        if(category) filter.category = category;
        if(title) filter.title = {$regex: title, $options:'i'};
        console.log(url.searchParams)
        console.log(`getAllForum filters: ${JSON.stringify(filter)}`)
        const totalRecords = await Forum.countDocuments(filter)
        const forums = await Forum.find(filter).skip(parseInt(offset)).limit(parseInt(limit));
        const response = {
            totalRecords,
            offset:offset,
            limit:limit,
            forums: forumListResponse(forums)
        };
        handleResponse(res, 200, "Retrieved Successfully", response)
    } catch (error) {
        console.log(`Error Occured: ${error}`);
        handleResponse(res, 500, "Service error", null)
    }
}

const forumListResponse = (forums) => {
    return forums.map(forum => mapForumResponse(forum))
}
const mapForumResponse = (forum) => ({
    forumId: forum._id,
    title: forum.title,
    creator: forum.creator,
    category: forum.category,
    description: forum.description,
    forumImage: forum.forumImage,
    createdAt: forum.createdAt,
    updatedAt: forum.updatedAt,
    publishedStatus: forum.publishedStatus
})

export const getAllForumByCategory = async (req, res) => {
    try {
        const forums = await Forum.findByCategory(1);
        handleResponse(res, 200, "Retrieved Successfully", forums)
    } catch (err) {
        console.log(`Error Occured: ${err}`);
        handleResponse(res, 500, 'Service error', null)
    }
}

export const updateForumCategory = async (req, res) => {
    try {
        let body = parseJson(req)
        const {id, title, category, description} = body;
        const newforum = await Forum.findByIdAndUpdate(id, {title, category, description})
        if (!newforum) {
            handleResponse(res, 400, 'forum not found')
        }
        handleResponse(res, 200, 'Updated Successfully', null)
    } catch (err) {
        console.log(`Error Occured: ${err}`);
        handleResponse(res, 500, 'Service error', null)
    }
}

export const deleteForum = async (req, res) => {
    try {
        const id = req.url.split('/')[3];
        console.log(id);
        var data = await Forum.findByIdAndDelete(id);
        console.log(data);
        handleResponse(res, 204, 'Deleted Successfully')

    } catch (err) {
        console.log(`Error Occured: ${err}`);
        handleResponse(res, 500, 'Service Error')
    }
}

export const getForumById = async (req, res) => {
    try {
        const id = req.url.split('/')[3]
        let forum = await Forum.findById(id)
        handleResponse(res, 200, "Retrieved Successfully", mapForumResponse(forum))
    } catch (err) {
        console.log(`Error Occured: ${err}`);
        handleResponse(res, 500, 'Service error', null)
    }
}