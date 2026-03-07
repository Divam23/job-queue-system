import { Job } from "../models/job.model.js";
import emailQueue from "../queues/email.queue.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import mongoose from "mongoose";

const createJob = asyncHandler(async (req, res) => {
    const { jobType, payload, priority, delay } = req.body;

    if (!jobType || payload === undefined || payload === null) {
        throw new ApiError(400, "jobType and payload are required");
    }

    const job = await Job.create({
        jobType,
        payload,
        priority: priority || 5,
        delay: delay || 0
    });


    await emailQueue.add(
        jobType,
        { 
            mongoJobId: job._id.toString(),
            ...payload
            
         },
        {
            attempts: job.maxRetries,
            backoff: {
                type: "exponential",
                delay: 2000
            },
            
            priority: job.priority,
            delay: job.delay || 0,
            removeOnComplete: false,
            removeOnFail: false,
        }
    )

    res
        .status(201)
        .json(new ApiResponse(201, job, "Job created successfully"));

})

const getJob = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Job Id not found");
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid Job ID");
    }

    const job = await Job.findById(id);

    if (!job) {
        throw new ApiError(400, "Job not found");
    }

    res.status(200).json(new ApiResponse(200, {
        jobId: job._id,
        status: job.status,
        delay: job.delay,
        retryCount: job.retryCount,
        errorLogs: job.errorLogs,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
    },"Job fetched successfully"))
})

export { createJob, getJob }