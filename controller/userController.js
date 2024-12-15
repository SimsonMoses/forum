import {parseJson} from "../util/parseJson.js";
import {User} from "../models/user.js";
import {handleResponse} from "../util/response.js";
import jwt from 'jsonwebtoken';
import {Url} from "url";

export const createUser = async (req, res) => {
    try {
        let body = await parseJson(req);
        console.log(JSON.stringify(body))
        const {fullName, email, userName, password, avatar, category} = body;
        let isUserExist = await User.findOne({email})
        if (isUserExist) return handleResponse(res, 400, 'User email already exists!!')
        let user = await User.create({fullName, email, userName, password, avatar, category});
        console.log(user)
        handleResponse(res, 200, 'User created successfully', user.userId);
    } catch (err) {
        console.log(`Error Occurred: ${err}`);
        handleResponse(res, 500, 'Service Error', null)
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = await parseJson(req);
    console.log(`Log in Request: ${email}`);
    try {
        let user = await User.findOne({email})
        if (!user) {
            return handleResponse(res, 401, 'Invalid email');
        }
        let valid = await user.isValidPassword(password)
        if (!valid) {
            return handleResponse(res, 401, 'Invalid password');
        }
        const token = jwt.sign({email: user.email, fullName: user.fullName, userName: user.userName},
            process.env.JWT_SECRET,
            {expiresIn: '30m'})
        res.setHeader('token', token)
        return handleResponse(res, 200, 'User login successfully');
    } catch (err) {
        console.log(`Error Occurred: ${err}`);
        return handleResponse(res, 500, 'Service Error')
    }
}

// todo: me api
export const me = async (req, res) => {
    console.log(`Me api call ${req.url}`);
    try {
        console.log(req.user)
        let email = req.user.email;
        let user = await User.findOne({email})
        if (!user) return handleResponse(400, 'Invalid email', email)
        const meResponse = {
            fullName: user.fullName,
            email: user.email,
            userName: user.userName,
            avatar: user.avatar
        }
        return handleResponse(res, 200, 'Success', meResponse)
    } catch (err) {
        console.log(err)
        return handleResponse(res, 500, 'Service Error');
    }
}

// todo: get profile
export const getUserProfile = async (req, res) => {
    console.log(`get user profile call ${req.url}`);
    try {
        let email = req.user.email;
        let user = await User.findOne({email})
        return handleResponse(res,200,'User profile retrieved successfully', profileResponse(user))
    } catch (error) {
        console.log(`Error Occurred: ${error}`);
        return handleResponse(res, 500, 'Service Error')
    }
}
// todo: update profile
export const updateUser = async (req, res) => {
    try {
        let reqUser = await parseJson(req)
        console.log(`Request: ${JSON.stringify(reqUser)}`)
        const {id, ...rest} = reqUser; // as rest can accept all valid field from user to update
        const {fullName, avatar, category,social,phoneNumber} = rest; // restrict to values that can be updated
        let newUser = await User.findByIdAndUpdate(id, {fullName,avatar,category,social,phone:phoneNumber})
        if (!newUser) return handleResponse(res, 400, 'Invalid user id', id)
        return handleResponse(res, 200, 'Successfully updated successfully')
    } catch (error) {
        console.log(error)
        return handleResponse(res, 500, 'Service Error')
    }
}

// todo: get all profile (filter)
export const getAllUsers = async (req,res) =>{
    console.log('Get all users call')
    try{
        const url = new URL(req.url,`http://${req.headers.host}`);
        const {searchText,offset=0,limit=10} = Object.fromEntries(url.searchParams.entries());
        let filters = {}
        if(searchText){
            // filters.fullName = {$regex:searchText,$options:'i'}
            filters.$or = [
                {fullName: {$regex: searchText,$options:'i'}},
                {username: {$regex: searchText,$options:'i'}},
                {email: {$regex: searchText,$options:'i'}}
            ]
        }
        console.log(`get all users: ${JSON.stringify(filters)}`)
        let users = await User.find(filters).skip(offset).limit(limit)
        return handleResponse(res,200,'User profile retrieved successfully', mapProfileResponse(users))

    }catch (err){
        console.log(`Error Occurred: ${err}`);
        return handleResponse(res, 500, 'Service Error')
    }
}

const mapProfileResponse = (users)=>{
    return users.map(user=>profileResponse(user))
}

const profileResponse = (user)=>({
    userId:user.id,
    fullName: user.fullName,
    email: user.email,
    userName: user.userName,
    avatar: user.avatar,
    social:user.social,
    phone:user.phone
})

