import mongoose from "mongoose";
import {v4 as uuid} from "uuid";
import bcrypt from 'bcrypt'
import {SocialSchema} from "./model.js";

const SALT_ROUNDS = 10


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
        },
        phone:String,
        social: {
            type: SocialSchema
        },
        role:String // TODO: need to set as enum
    },
    {
        timestamps:true
    }
)

usersSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        this.password = await bcrypt.hash(this.password,salt);
        next();
    }catch (error){
        next(error)
    }
})

usersSchema.methods.isValidPassword = async function (password){
    return bcrypt.compare(password,this.password)
}
export const User = mongoose.model('User', usersSchema);