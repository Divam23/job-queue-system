import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo DB connected successfully");
    } catch (error) {
        console.log("Mongo DB connection failed");
        process.exit(1);
    }
}

export {connectDB};