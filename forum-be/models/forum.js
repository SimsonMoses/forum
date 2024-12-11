import mongoose from "mongoose";

const forumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        default:'JAVA'
    },
    creator:{
        type:String,
        required:true,
    }
})

const Forum = mongoose.model('Forum', forumSchema);
export default Forum;