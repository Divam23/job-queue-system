import app from "./app.js"
import redis from "./config/redis.js";
import {configDotenv} from "dotenv";

configDotenv();


const PORT = process.env.PORT;


app.listen(PORT, (()=>{
    console.log(`Started on http://localhost:${PORT}`)
}))

//Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});


//For background workers
let isShuttingDown = false;

process.on("SIGTERM", async () => {
  isShuttingDown = true;
  console.log("Worker shutting down...");

  await queue.close();   // Bull/BullMQ
  await redis.quit();    // Redis
  process.exit(0);
});
