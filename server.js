import {createServer} from 'http'
import {forumRoute} from './routes/forumRoute.js'
import {connectDb} from './config/db.js'
import {userRoute} from "./routes/userRoute.js";
import {forumMemberRequestRoute} from "./routes/forum/forum-member-request-route.js";
import {Url} from "url";

connectDb();

const PORT = process.env.PORT;
process.setMaxListeners(20);
const server = createServer((req, res) => {
    const url = new Url(req.url);
    if (req.url.startsWith('/api/forum')) {
        return forumRoute(req, res);
    } else if (req.url.startsWith('/api/user')) {
        return userRoute(req,res)
    } else if(url.pathname.startsWith('/api/forum/member/')){
        return forumMemberRequestRoute(req, res);
    }else {
        return res.status(404).send('End point not configured')
    }
})


server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})