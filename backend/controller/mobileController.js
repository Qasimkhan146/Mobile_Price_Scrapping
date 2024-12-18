import Mobile from "../model/mobileModel.js";
import Price from "../model/priceModel.js";
import stringSimilarity from "string-similarity";

export const fetchSingleMobilePrice = async (req, res) => {
  try {
    const { model } = req.params; // Mobile model name from URL params

    // Fetch the mobile from the Mobile collection
    const mobile = await Mobile.findOne({ model: new RegExp(`${model}`, "i") }); // Exact match
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }

    // Fetch all price records
    const allPrices = await Price.find();

    // Filter prices for exact matches with the mobile model
    const exactMatchingPrices = allPrices.filter((price) =>
      price.model.toLowerCase() === mobile.model.toLowerCase()
    );

    // If exact matches are found, return them
    if (exactMatchingPrices.length > 0) {
      const priceDetails = exactMatchingPrices.map((price) => ({
        source: price.source,
        price: price.price,
        href: price.href,
        hrefName: price.hrefName,
        brand: price.brand,
        model: price.model,
      }));

      return res.status(200).json({ mobile, prices: priceDetails });
    }

    // If no exact matches, fall back to fuzzy matching
    const threshold = 0.3; // Adjust similarity threshold for fallback
    const fuzzyMatchingPrices = allPrices.filter((price) => {
      const similarity = stringSimilarity.compareTwoStrings(
        mobile.model.toLowerCase(),
        price.model.toLowerCase()
      );
      return similarity >= threshold; // Include only matches above the threshold
    });

    if (!fuzzyMatchingPrices.length) {
      return res.status(404).json({ message: "No matching prices found for this mobile" });
    }

    // Prepare the price details for fuzzy matches
    const priceDetails = fuzzyMatchingPrices.map((price) => ({
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
