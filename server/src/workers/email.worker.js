import { Worker } from "bullmq";
import redisConnection from "../config/redis.js"
import { configDotenv } from "dotenv";
import { Job } from "../models/job.model.js";
import { connectDB } from "../config/db.js";

configDotenv();

await connectDB();

const connection = redisConnection;

console.log("Worker is ready and is waiting for jobs")
const worker = new Worker(
  "email-queue",
  async (jobQueue) => {
    const { mongoJobId } = jobQueue.data;


    const job = await Job.findById(mongoJobId)
    if (!job) return;

    job.status = "PROCESSING";
    await job.save();

    try {
      console.log("Processing Job ", job.id)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      job.status = "COMPLETED";
      job.processedAt = new Date();
      await job.save();
      console.log("Ho gya job");
      return { success: true }; 

    } catch (error) {
      job.status = "FAILED";
      job.failedReason = error.message;
      job.processedAt = new Date();
      job.retryCount+=1;
      await job.save();

      throw error;
    }

  },
  { connection, concurrency: 5 }
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