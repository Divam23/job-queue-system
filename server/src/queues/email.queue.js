import {Queue, Worker} from "bullmq";

const emailQueue = new Queue('email-queue', {
    connection:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },

})

export default emailQueue;