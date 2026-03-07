import {app} from "./app.js"
import { connectDB } from "./config/db.js";
import {configDotenv} from "dotenv";

configDotenv();

const PORT = process.env.PORT;

let server;

//DB Connection
connectDB()
.then(()=>{
  server = app.listen(PORT, (()=>{
    console.log(`Started on http://localhost:${PORT}`)
  }))
}
  
)
.catch((err)=>{
  console.log("Mongo DB Connection failed!!!", err);
})

//Graceful Shutdown
process.on("SIGINT", () => {
  console.log("Gracefully shutting down...");
  
  server.close(() => {
    console.log("HTTP server closed");
    process.exit(0);
  });
});


