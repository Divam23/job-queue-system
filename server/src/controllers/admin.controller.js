import emailQueue from "../queues/email.queue.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getQueueStats = asyncHandler(async(req, res)=>{
    const waiting = await emailQueue.getWaitingCount();
    const processing = await emailQueue.getActiveCount();
    const completed = await emailQueue.getCompletedCount();
    const failed = await emailQueue.getFailedCount();
    const delayed = await emailQueue.getDelayedCount();

    res.status(200).json(new ApiResponse(200, {
        waitingJobs: waiting,
        processingJobs: processing,
        completedJobs: completed,
        failedJobs: failed,
        delayedJobs: delayed
    }, "Queue Stats fetched successfully"))
})