import express from "express";
import dotenv from "dotenv"
import { conn } from "./connections/dbConnect.js";
import voteRoute from "./Routes/voteRoute.js";
import fileUpload from "express-fileupload";
import cors from "cors"



dotenv.config()
const app= express()
conn()
app.use(fileUpload())
app.use(express.json())
app.use(cors());
app.use("/api",voteRoute)

const port= process.env.PORT
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})