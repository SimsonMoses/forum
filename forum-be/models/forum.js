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
    },
    category:Number,
    description:{
        type:String,
        required:true,
        length:1000
    },
    
},{
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
}
)

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
