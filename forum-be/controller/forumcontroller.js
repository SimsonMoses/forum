import Forum from '../models/forum.js'

export const createForum = async(req,res,body) =>{
    try{
        const {name,creator} = body;
        const newForum = await Forum.create({name,creator});
        res.statusCode=201
        res.write(JSON.stringify({"message":"Created successfully"}))    
        res.end()
    }catch(err){
        console.log(`Error Occured: ${err}`);
        res.statusCode=500
        res.write(JSON.stringify({"message":"Service error"}))
        res.end()
    }
}

export const getAllForum = async (req,res)=>{
    try {
        const forums = await Forum.find();
        res.statusCode=200
        res.write(JSON.stringify(forums))
        res.end()
    } catch (error) {
        console.log(`Error Occured: ${error}`);
        res.statusCode=500
        res.write(JSON.stringify({"message":"Service error"}))
        res.end()
    }
}

// module.exports ={
//     createForum:createForum(req,res),
//     getAllForum
// }