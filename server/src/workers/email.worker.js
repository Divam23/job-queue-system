import { Worker } from "bullmq";
import IORedis from "ioredis";
import { configDotenv } from "dotenv";

configDotenv();

const connection = new IORedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  maxRetriesPerRequest: null,
});

console.log("Worker is ready and is waiting for jobs")
const worker = new Worker(
    "email-queue",
    async(job)=>{
        console.log("Processing Job ",job.id)
        console.log("Job Data: ", job.data)

        await new Promise((resolve)=> setTimeout(resolve, 3000))

        console.log("Job completed:", job.id);
  },
  { connection }
);

// Event listeners
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});

process.on("SIGINT", async () => {
  console.log("Shutting down worker...");
  await worker.close();
  await connection.quit();
  process.exit(0);
});