import Mobile from "../model/mobileModel.js";
import Price from "../model/priceModel.js";

export const fetchSingleMobilePrice = async (req, res) => {
  try {
    const { model } = req.params; // Get model name from URL parameters

    // Find mobile details (case-insensitive match)
    const mobile = await Mobile.findOne({ model: new RegExp(model, "i") });
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }

    // Find all prices for the given model (case-insensitive match)
    const prices = await Price.find({ model: new RegExp(model, "i") });
    if (!prices.length) {
      return res.status(404).json({ message: "Prices not found for the selected mobile" });
    }

    // Prepare the price details
    const priceDetails = prices.map((price) => ({
      source: price.source,
      price: price.price,
      href: price.href,
      hrefName: price.hrefName,
    }));

    // Combine mobile details and price information
    res.status(200).json({ mobile, prices: priceDetails });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
