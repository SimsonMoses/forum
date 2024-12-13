import {parseJson} from "../util/parseJson.js";
import {User} from "../models/user.js";
import {handleResponse} from "../util/response.js";
import {Json} from "sequelize/lib/utils";

export const createUser = async (req, res) => {
    try {
        let body = await parseJson(req);
        console.log(JSON.stringify(body))
        const {fullName, email, userName, password, avatar, category} = body;
        let user = await User.create({fullName, email, userName, password,avatar,category});
        console.log(user)
        handleResponse(res, 200, 'User created successfully', user.userId);
    } catch (err) {
        console.log(`Error Occured: ${err}`);
        handleResponse(res, 500, 'Service Error', null)
    }
}