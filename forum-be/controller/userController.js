import {parseJson} from "../util/parseJson.js";
import {User} from "../models/user.js";
import {handleResponse} from "../util/response.js";

export const createUser = async (req, res) => {
    try {
        let body = await parseJson(req);
        console.log(JSON.stringify(body))
        const {fullName, email, userName, password, avatar, category} = body;
        let isUserExist = await User.findOne({email})
        if (isUserExist) return handleResponse(res,400,'User email already exists!!')
        let user = await User.create({fullName, email, userName, password,avatar,category});
        console.log(user)
        handleResponse(res, 200, 'User created successfully', user.userId);
    } catch (err) {
        console.log(`Error Occurred: ${err}`);
        handleResponse(res, 500, 'Service Error', null)
    }
}

export const loginUser = async (req,res) =>{
    const {email,password} = await parseJson(req);
    console.log(`Log in Request: ${email}`);
    try{
        let user = await User.findOne({email})
        if(!user){
            return handleResponse(res,401,'Invalid email');
        }
        let valid = await user.isValidPassword(password)
        if(!valid){
            return handleResponse(res,401,'Invalid password');
        }
        handleResponse(res,200, 'User login successfully');
    }catch (err) {
        console.log(`Error Occurred: ${err}`);
        handleResponse(res,500, 'Service Error')
    }
}

// todo: me api

// todo: get profile

// todo: update profile

// todo: get all profile (filter)