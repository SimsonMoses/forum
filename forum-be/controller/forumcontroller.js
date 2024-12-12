import Forum from '../models/forum.js'
import {handleResponse} from '../util/response.js'


export const createForum = async(req,res,body) =>{
    try{
        const {name,creator} = body;
        const newForum = await Forum.create({name,creator});
        handleResponse(res,201,"Created Successfully",null)
    }catch(err){
        console.log(`Error Occured: ${err}`);
        handleResponse(res,500,'Service Error',null)
    }
}

export const getAllForum = async (req,res)=>{
    try {
        const forums = await Forum.find();
        handleResponse(res,200,"Retrived Successfully",forums)
    } catch (error) {
        console.log(`Error Occured: ${error}`);
        handleResponse(res,500,"Service error",null)
    }
}

// module.exports ={
//     createForum:createForum(req,res),
//     getAllForum
// }