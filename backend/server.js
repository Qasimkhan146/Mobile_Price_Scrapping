import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/mongoDBconfig.js";
import mobileRouter from "./routes/mobileRoute.js";
import brandRouter from "./routes/brandRoute.js";
import adminRoute from "./routes/authRoute.js";
import authRoute from "./routes/authRoute.js";
// import { downloadImages } from "./utills/script.js";

connectDB();
// downloadImages();
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

app.use("/mobile",mobileRouter);
app.use("/brand",brandRouter);
app.use("/auth",authRoute);
const port = 4500;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
