import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () =>{
    try{
        // await mongoose.connect('mongodb://localhost:27017/mobilePrice',);
        // await mongoose.connect('mongodb://192.168.10.86:7842/mobileprice',);
        await mongoose.connect('mongodb://mp.magma3c.com:7842/mobileprice',);

        console.log("MongoDB connected")
    }catch(error){
        console.log(error)
    }
}
export default connectDB

//mongodb://localhost:27017/mobilePrice
//mongodb://192.168.10.86:7842/mobileprice