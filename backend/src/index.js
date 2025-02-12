import express from "express"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
import path from 'path';



const PORT = process.env.PORT;
const __dirname = path.resolve();


dotenv.config();
app.use(cookieParser());//parsing cookie
app.use(express.json())//for parsing app/json 

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
    
if(process.env.NODE_ENV !== "development"){
    app.use(express.static(path.join(__dirname, "frontend", "dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
    })
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);   
});