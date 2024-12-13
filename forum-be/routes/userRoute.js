import {createUser} from "../controller/userController.js";


export const userRoute = async (req,res)=>{
    console.log('user routes log')
    if(req.method === 'POST' && req.url === '/api/user/register'){
        createUser(req, res)
    }
}