import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () =>{
    try{
        // await mongoose.connect("mongodb://uzair:Uzair1234@192.168.10.86:7842/mobilePrice")
        await mongoose.connect('mongodb://uzair:Uzair1234@116.202.124.91:7842/mobilePrice',);

        console.log("MongoDB connected")
    }catch(error){
        console.log(error)
    }
}
export default connectDB