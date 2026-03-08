# Job Queue and Background Worker System

A scalable background job processing system built using Node.js, Redis, BullMQ, and MongoDB.  
The system allows asynchronous job execution, retry handling, delayed jobs, priority queues, and horizontally scalable workers.

It is designed to demonstrate distributed job processing and backend system reliability.

## Architecture of the project

```
Client/API
   ↓
Express Server
   ↓
MongoDB (Job Metadata)
   ↓
Redis Queue (BullMQ)
   ↓
Worker Processes
   ↓
Background Task Execution
```

## Tech Stack
Backend
- Node.js
- Express.js

Queue System
- Redis
- BullMQ

Database
- MongoDB

Containerization
- Docker
- Docker Compose

## Features
Features

• Background job processing  
• Job lifecycle tracking (PENDING → PROCESSING → COMPLETED/FAILED)  
• Retry mechanism with exponential backoff  
• Delayed job execution  
• Job priority support  
• Worker concurrency  
• Multiple worker scaling  
• Queue monitoring endpoints  
• Fault tolerance and idempotent job execution  
• Dockerized deployment

## API Endpoints

<h3>Create a Job</h3>
POST /jobs

Request Body:
```json
{
  "jobType": "EMAIL",
  "payload": {
    "to": "test@example.com",
    "subject": "Hello"
  },
  "priority": 1,
  "delay": 5000
}
```


Response Body:
```json
{
    "statusCode": 201,
    "data": {
        "jobType": "EMAIL_BHEJ_RHE",
        "payload": {
            "data": "bhai multiple workers kaam kr rhe hai"
        },
        "status": "PENDING",
        "retryCount": 0,
        "maxRetries": 5,
        "priority": 3,
        "delay": 3000,
        "_id": "69ace532c60f456ddc398a77",
        "errorLogs": [],
        "scheduledAt": "2026-03-08T02:55:46.273Z",
        "createdAt": "2026-03-08T02:55:46.276Z",
        "updatedAt": "2026-03-08T02:55:46.276Z",
        "__v": 0
    },
    "message": "Job created successfully",
    "success": true
}
```

<h3>Get Job Stats</h3>
GET /jobs/:id

Response example:
```json
{
    "statusCode": 200,
    "data": {
        "jobId": "69acf113730ce5d359591da4",
        "status": "COMPLETED",
        "delay": 3000,
        "retryCount": 0,
        "errorLogs": [],
        "createdAt": "2026-03-08T03:46:27.600Z",
        "updatedAt": "2026-03-08T03:46:35.748Z"
    },
    "message": "Job fetched successfully",
    "success": true
}
```
<h3>Get Queue Stats</h3>
GET /admin/stats

Response example:
```json
{
    "statusCode": 200,
    "data": {
        "waitingJobs": 12,
        "processingJobs": 14,
        "completedJobs": 6,
        "failedJobs": 1,
        "delayedJobs": 8
    },
    "message": "Queue Stats fetched successfully",
    "success": true
}
```

## Quick start
<h3>Local Development:</h3>

```bash
npm install
node server.js
node src/workers/email.worker.js
```
<h3>Docker:</h3>

Run entire system: ```docker-compose up --build```

Scale workers: ```docker-compose up --scale worker=4```

<h3>Job Lifecycle</h3>
```
PENDING → PROCESSING → COMPLETED
                ↘ FAILED
```

## Environment (example)
```js
PORT=5000(example)
REDIS_USER=default
REDIS_PASS=your_redis_password
REDIS_HOST=redis
REDIS_PORT=6379
```


## Project Folder Structure

```
Job-Queue-and-Background-Worker-System/
│
├── docker-compose.yml
├── README.md
├── .gitignore
│
├── server/
    │
    ├── DockerFile.api
    ├── DockerFile.worker
    ├── package.json
    ├── package-lock.json
    ├── .env
    │
    ├── src/
        │
        ├── index.js
        ├── app.js
        │
        ├── config/
        │   ├── db.js
        │   └── redis.js
        │
        ├── controllers/
        │   └── job.controller.js
        │   └── admin.controller.js
        │
        ├── routes/
        │   └── job.routes.js
        │   └── admin.routes.js
        │
        ├── models/
        │   └── job.model.js
        │
        ├── queue/
        │   └── email.queue.js
        │
        ├── workers/
        │   └── email.worker.js
        │
        ├── middlewares/
        │   └── error.middleware.js
        │
        ├── utils/
            ├── ApiError.js
            ├── ApiResponse.js
            ├── asyncHandler.js
            └── jobState.js

```

## Future Improvements
```
- Web dashboard for monitoring
- Authentication for admin endpoints
- Rate limiting for job creation
- Metrics with Prometheus/Grafana
```
## This project demonstrates:

```
• Distributed job processing
• Message queue architecture
• Worker-based asynchronous systems
• Fault tolerance and retry strategies
• Horizontal scaling using multiple workers
• Observability through monitoring endpoints
```