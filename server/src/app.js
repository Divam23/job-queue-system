import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./middlewares/error.middleware.js";

//routes import
import jobsRouter from "../src/routes/jobs.routes.js"

const app = express();

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())
app.use(cors({origin: process.env.CORS_ORIGIN}));

//home route
app.get('/', (req,res)=>{
    res.send("Starting here");
})

//api-health route
app.get("/health", (req, res)=>{
    res.send("Health check");
})

//jobs route
app.use("/api/v1", jobsRouter)


app.use(errorMiddleware)
export {app};