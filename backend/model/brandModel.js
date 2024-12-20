import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    brand: {type : String },
    description: {type : String},
    bannerUrl: {type : String},
    imageUrl: {type : String},
    rating: {type : Number}
})

const Brand = mongoose.model("brand", brandSchema);

export default Brand;