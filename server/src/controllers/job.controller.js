import { Job } from "../models/job.model.js";
import emailQueue from "../queues/email.queue.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createJob = asyncHandler(async (req, res) => {
    const { jobType, payload, priority } = req.body;

    if ( !jobType || payload === undefined || payload === null ) {
        throw new ApiError(400, "jobType and payload are required");
    }

    const job = await Job.create({
        jobType,
        payload,
        priority: priority || 0
    });

    await emailQueue.add(
        jobType,
        { mongoJobId: job._id },
        {
            attempts: job.maxRetries,
            backoff: {
                type: "exponential",
                delay: 2000
            },
            priority: job.priority,
            removeOnComplete: false,
            removeOnFail: false,
        }
    )

    res
        .status(201)
        .json(new ApiResponse(201, job, "Job created successfully"));

})

export { createJob }