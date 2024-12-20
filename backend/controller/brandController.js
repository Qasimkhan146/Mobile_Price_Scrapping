import Brand from "../model/brandModel.js";

export const fetchAllBrands = async (req , res)=>{
    try {
        const brands = await Brand.find().sort({rating: 1});
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error:error.message})        
    }
}