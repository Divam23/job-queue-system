import Redis from "ioredis";
import { configDotenv } from "dotenv";

configDotenv()

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
})

redis.on("connect", ()=>{
    console.log("Redis connected");
})

redis.on("error", (error)=>{
    console.log(error)
})

export default redis;