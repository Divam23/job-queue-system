import express from "express";
import redis from "./config/redis.js";
import {configDotenv} from "dotenv";

configDotenv();

const app = express();

const PORT = process.env.PORT;

app.get('/', (req,res)=>{
    res.send("Starting here");
})

app.get("/health", (req, res)=>{
    res.send("Health check");
})

app.listen(PORT, (()=>{
    console.log(`Started on http://localhost:${PORT}`)
}))