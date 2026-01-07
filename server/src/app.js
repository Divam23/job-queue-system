import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

app.get('/', (req,res)=>{
    res.send("Starting here");
})

app.get("/health", (req, res)=>{
    res.send("Health check");
})


export {app};