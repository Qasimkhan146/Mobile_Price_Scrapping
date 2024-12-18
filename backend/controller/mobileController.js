import Mobile from "../model/mobileModel.js";
import Price from "../model/priceModel.js";
import stringSimilarity from "string-similarity";

export const fetchSingleMobilePrice = async (req, res) => {
  try {
    const { model } = req.params; // Mobile model name from URL params

    // Fetch the mobile from the Mobile collection
    const mobile = await Mobile.findOne({ model: new RegExp(model, "i") });
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }

    // Fetch all price records
    const allPrices = await Price.find();

    // Use string similarity to filter prices with similar model names
    const threshold = 0.8; // Adjust similarity threshold (higher = stricter match)
    const matchingPrices = allPrices.filter((price) => {
      const similarity = stringSimilarity.compareTwoStrings(
        mobile.model.toLowerCase(),
        price.model.toLowerCase()
      );
      return similarity >= threshold; // Include only matches above the threshold
    });

    if (!matchingPrices.length) {
      return res.status(404).json({ message: "No matching prices found for this mobile" });
    }

    // Prepare the price details
    const priceDetails = matchingPrices.map((price) => ({
      source: price.source,
      price: price.price,
      href: price.href,
      hrefName: price.hrefName,
      brand: price.brand,
      model: price.model,

    }));

    // Combine mobile details and matching price information
    res.status(200).json({ mobile, prices: priceDetails });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
