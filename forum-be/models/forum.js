import mongoose from "mongoose";
import {v4 as uuid} from "uuid";

const forumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    creator:{
        type:String,
        required:true,
    },
    category:Number,
    description:{
        type:String,
        required:true,
        length:100
    },
    forumImage:String,
    // customId: {
    //     type: String,
    //     required: true,
    //     unique: true, // Ensures uniqueness
    //     default:uuid
    // }
    publishedStatus:{
        type:String,
        default:'in_progress'
    },
    deletedAt:Date
},{
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
}
)

// forumSchema.plugin(AutoIncrement, { inc_field: 'customId' })
// ID autoincrement 
/*
1. counter collection
2. use plugin
3. uuid
4. mongno default _id
5. use custom but (not presistent)
6. db auto increment (not for mongodb)
*/

forumSchema.statics={
    findByCategory(category){
        return this.find({category});
    }
}

const Forum = mongoose.model('Forum', forumSchema);
export default Forum;

// ORM 
/* 
import { Sequelize, DataTypes } from "sequelize";

// Initialize Sequelize
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // or 'postgres', 'sqlite', 'mariadb', 'mssql'
});
const Forum = sequelize.define('Forum',forumSchema);
*/
