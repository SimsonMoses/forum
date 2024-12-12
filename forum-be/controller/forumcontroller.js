import Forum from '../models/forum.js'
import {handleResponse} from '../util/response.js'


export const createForum = async(req,res,body) =>{
    try{
        const {name,creator,category,description} = body;
        const newForum = await Forum.create({name,creator,category,description});
        handleResponse(res,201,"Created Successfully",null)
    }catch(err){
        console.log(`Error Occured: ${err}`);
        handleResponse(res,500,'Service Error',null)
    }
}

export const getAllForum = async (req,res)=>{
    try {
        const forums = await Forum.find();
        // TODO: get the query param in the get all forums
        handleResponse(res,200,"Retrived Successfully",forums)
    } catch (error) {
        console.log(`Error Occured: ${error}`);
        handleResponse(res,500,"Service error",null)
    }
}

export const getAllForumByCategory = async (req,res)=>{
    try{
        const forums = await Forum.findByCategory(1);
        handleResponse(res,200,"Retrived Successfully",forums)
    }catch(err){
        console.log(`Error Occured: ${err}`);
        handleResponse(res,500,'Service error',null)
    }
}

// todo: update


// todo:delete

// module.exports ={
//     createForum:createForum(req,res),
//     getAllForum
// }