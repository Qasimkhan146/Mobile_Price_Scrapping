import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/mongoDBconfig.js";

connectDB();
const app = express();
app.use(cors({
    origin:"*",
    credentials:true,
    methods:["GET","POST"]
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//env
dotenv.config();

//routes
app.use("/",(req,res)=>{
    res.send("hello");
})
//port
const port = process.env.PORT || 4500;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})

