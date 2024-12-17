import Mobile from "../model/mobileModel.js";
import Price from "../model/priceModel.js";

export const fetchSingleMobilePrice = async (req, res) => {
  try {
    const { model } = req.params;
    const mobile = await Mobile.findOne({ model: new RegExp(model, "i") });
    const prices = await Price.find({ model: new RegExp(model, "i") });
    if (!mobile) {
      return res.status(404).send("Mobile not found");
    }
    if (!prices.length) {
      return res.status(404).send("Price not found");
    }
    const priceDetails = prices.map((price) => ({
      source: price.source,
      price: price.price,
      href: price.href,
    }));

    res.status(200).send({ mobile, prices: priceDetails });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

