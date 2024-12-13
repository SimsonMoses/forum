import mongoose from 'mongoose'

export const connectDb = async () => {
    try {
        console.log(`uri: ${process.env.MONGO_URI}`);

        let connection = await mongoose.connect(process.env.MONGO_URI, {
            
        })
        
        console.log('connect to mongodb');
    } catch (err) {
        console.log('connection failed');
        console.log(err);
        process.exit(1)
    }
}