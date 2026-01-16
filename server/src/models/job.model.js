import { mongoose, Schema } from "mongoose";

const jobSchema = new Schema({
    jobType: {
        type: String,
        required: true,
        index: true
    },
    payload: {
        type: Schema.Types.Mixed,
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "PROCESSING", "COMPLETED", "FAILED"],
        default: "PENDING",
        index: true
    },
    retryCount: {
        type: Number,
        default: 0
    },
    maxRetries: {
        type: Number,
        default: 5
    },
    priority: {
        type: Number,
        default: 0
    },

    errorLogs: [
        {
            message: String,
            stack: String,
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ],
    processedAt: {
        type: Date
    },

    scheduledAt: {
        type: Date
    }
}, 
{
    timestamps: true
}
);

jobSchema.index({status: 1, priority: -1, createdAt: 1});

const Job = mongoose.model("Job", jobSchema);

export { Job };

