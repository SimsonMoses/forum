import Forum from '../models/forum.js'
import { parseJson } from '../util/parseJson.js';
import {handleResponse} from '../util/response.js'


export const createForum = async(req,res) =>{
    try{
        let body = await parseJson(req)
        const {title,creator,category,description} = body;
        const newForum = await Forum.create({title,creator,category,description});
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

export const updateForumCategory = async (req,res)=>{
    try{
        let body = parseJson(req)
        const {id,title,category,description} = body;
        const newforum = await Forum.findByIdAndUpdate(id,{title,category,description})
        if(!newforum){
            handleResponse(res,400,'forum not found')
        }
        handleResponse(res,200,'Updated Successfully',null)
    }catch(err){
        console.log(`Error Occured: ${err}`);
        handleResponse(res,500,'Service error',null)
    }
}

// todo:delete
export const deleteForum = async (req,res)=>{
    try {
        const id = req.url.split('/')[3];
        console.log(id);
        var data = await Forum.findByIdAndDelete(id);
        console.log(data);
        handleResponse(res,204,'Deleted Successfully')
        
    } catch (err) {
        console.log(`Error Occured: ${err}`);
        handleResponse(res,500,'Service Error')
    }
}
