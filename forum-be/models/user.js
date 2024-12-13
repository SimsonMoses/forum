import mongoose from "mongoose";
import {v4 as uuid} from "uuid";


const usersSchema = new mongoose.Schema(
    {
        // custom userid
        userId:{
            type:String,
            required:true,
            unique:true,
            default:uuid()
        },
        userName:String,
        fullName:String,
        email:String,
        password:{
            type:String
        },
        avatar:String,
        category:{
            type:[],
            default:[1]
        }
    },
    {
        timestamps:true
    }
)

export const User = mongoose.model('User', usersSchema);