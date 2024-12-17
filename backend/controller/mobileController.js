import Mobile from "../model/mobileModel.js";
import Price from "../model/priceModel.js";
export const fetchSingleMobilePrice =async (req, res) => {
  try {
    const { model } = req.params;
    const mobile =await Mobile.findOne({ model: new RegExp(model, "i") });
    if(!mobile){
        res.status(404).send("mobile not found")
    }

    const price  = await Price.findOne({model: new RegExp(model, "i")});
    if(!price){
        res.status(404).send("price not found")
    }
    res.status(200).send(mobile && price.map((price) => ({
        source: price.source,
        price: price.price,
        href: price.href,
      })),);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
