import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/mongoDBconfig.js";
import mobileRouter from "./routes/mobileRoute.js";
import brandRouter from "./routes/brandRoute.js";
import adminRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
// import { downloadImages } from "./utills/script.js";

connectDB();
// downloadImages();

const app = express();
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,              // Allow cookies
    methods: ["GET", "POST"],       // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//env
dotenv.config();

app.use("/mobile",mobileRouter);
app.use("/brand",brandRouter);
app.use("/auth",authRoute);
app.use("/admin",adminRoute);
const port = 4501;
app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})
