import mongoose from "mongoose";
import 'dotenv/config'

const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/PersonalBlog`) // using localhost to run    
        console.log(`MongoDb host connected Mongo connection Host: ${connectionInstance.connection.host}:${connectionInstance.connection.port}`); 
    } catch (error) {
        console.log(error);        
    }
}
export {
    connectDb
}