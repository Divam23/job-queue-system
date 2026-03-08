import Redis from "ioredis";
import { configDotenv } from "dotenv";

configDotenv()

const redisConnection = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    // password: process.env.REDIS_PASS,
    maxRetriesPerRequest: null
})

redisConnection.on("connect", ()=>{
    console.log("Redis connected");
})

redisConnection.on("error", (error)=>{
    console.log("Error hai bhosdi: ",error)
    
})

export default redisConnection;