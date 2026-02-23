import { Job } from "../models/job.model.js";
import emailQueue from "../queues/email.queue.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createJob = asyncHandler(async (req, res) => {
    try {

        const { jobType, payload, priority } = req.body;

        if (!jobType || !payload) {
            throw new ApiError(401, "jobType and payload are required")
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
                priority: job.priority,
                attempts: job.attempts,
            }
        )

        res
            .status(201)
            .json(new ApiResponse(201, job, "Job created successfully"));
    } catch (error) {
        throw new ApiError(500, "Job creation mein error hai", error)
    }
})

export { createJob }