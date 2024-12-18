import Mobile from "../model/mobileModel.js";
import Price from "../model/priceModel.js";

export const fetchSingleMobilePrice = async (req, res) => {
    try {
        const {model} = req.params;
        const mobile = await Mobile.findOne({model});
        if(!mobile){
            return res.status(404).json({message:"Mobile not found"});
        }
        // const price = await Price.findOne({model});
        // if(!price){
        //     return res.status(404).json({message:"Price not found"});
        // }
        // const response = {
        //     mobile,
        //     price,
        //   };

        return res.status(200).json(model);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"});    
    }
}

