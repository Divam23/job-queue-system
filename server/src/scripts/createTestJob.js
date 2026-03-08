import {mongoose} from "mongoose";
import { configDotenv } from "dotenv";
import { Job } from "../models/job.model.js";
import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

configDotenv();


const queue = new Queue("email-queue", {connection: redisConnection});

const createdJob = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI);
        if(connection){
            const job = await Job.create({
                jobType: "EMAIL",
                payload:{
                    to: "test@example.com",
                    subject: "TEST EMAIL"
                },
                status: "PROCESSING",
                retryCount: 0,
                maxRetries: 3
            })
            console.log("Job Created: ", job)

            await queue.add("emailJob", {
                jobId: job._id.toString(),
                ...job.payload,
            })
            console.log("Job added to redis queue: ", job._id)
            process.exit(0)
        }
    } catch (error) {
        console.log("Error creating Job: ",error);
        process.exit(1);
    }
}

createdJob();