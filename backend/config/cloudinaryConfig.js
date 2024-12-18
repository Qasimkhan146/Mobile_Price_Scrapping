import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Set up Cloudinary storage with multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "mobile_price", // Specify a folder name in Cloudinary
        allowed_formats: ["jpg", "png", "jpeg"],
    },
});

// Set up multer middleware
export const upload = multer({ storage });