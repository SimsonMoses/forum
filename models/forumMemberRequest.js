import mongoose from "mongoose";
import {ObjectId} from "mongodb";


const memberRequestSchema = new mongoose.Schema({
        userId: ObjectId,
        forumId: ObjectId,
        requestType: {
            type: String,
            enum: ['invited', 'requested']
        },
        status:{
            type: String,
            default:'in_progress',
            enum:['approved','rejected','in_progress']
        },
        actionOn:{
            type: Date
        }
    }, {
        timestamps: true
    }
)

memberRequestSchema.index({userId:1,forumId:1},{unique:true})

export const ForumMemberRequest = mongoose.model('ForumMemberRequest',memberRequestSchema);
