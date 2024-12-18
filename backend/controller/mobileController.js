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
    const threshold = 1; // Adjust similarity threshold (higher = stricter match)
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

// fetch10LatestMobiles and there price in price collection
// export const fetch10LatestMobiles = async (req, res) => {
//     try {
//         const mobiles = await Mobile.find().limit(10);
//         if(!mobiles){
//             return res.status(404).json({message:"Mobiles not found"})
//         }
        
//         const price = await Price.find().limit(10);
//         if(!price){
//             return res.status(404).json({message:"Price not found"})
//         }

//     } catch (error) {
        
//     }
// }


// fetch 10 latest mobiles with their prices
export const fetch10LatestMobilesWithPrices = async (req, res) => {
    try {
      const threshold = 1; // Define the similarity threshold
  
      // Fetch the latest mobiles sorted by creation date and limited to the specified count
      const latestMobiles = await Mobile.find().sort({ createdAt: -1 }).limit(10);
      if (!latestMobiles.length) {
        return res.status(404).json({ message: "No mobiles found" });
      }
  
      // Fetch prices for each mobile with string similarity matching
      const mobilesWithPrices = await Promise.all(
        latestMobiles.map(async (mobile) => {
          // Fetch prices matching the model with a similarity check
          const allPrices = await Price.find(); // Fetch all prices
          const matchingPrices = allPrices.filter((price) => {
            const similarity = stringSimilarity.compareTwoStrings(
              mobile.model.toLowerCase(),
              price.model.toLowerCase()
            );
            return similarity >= threshold; // Include only matches above the threshold
          });
  
          // Map the matching prices to include only relevant fields
          return {
            mobile,
            prices: matchingPrices.map((price) => ({
              source: price.source,
              price: price.price,
              href: price.href,
              hrefName: price.hrefName,
              brand: price.brand,
              model: price.model,
            })),
          };
        })
      );
  
      // Respond with the combined data
      res.status(200).json(mobilesWithPrices);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//create a new mobile
export const createMobile = async (req, res) =>{
    try {
        const {model, price, hrefName, href, imageSRC, brand, OS, Dimensions, weight, SIM, Colors,twoG, threeG, fourG, fiveG, CPU, Chipset, GPU, Technology, Size,Resolution, Protection, Extra_Features, Ram, Rom, Built_in, Card, Main, Back_Cam, Features, Front_Cam, Front, WLAN, Bluetooth, GPS, Data, Sensors, Audio, Browser, Messaging, Games, Extra, Capacity, PriceInUsd, Radio} = req.body;

        const mobile = await Mobile.create({
            model,
            price,
            hrefName,
            href,
            imageSRC:req.file.path,
            brand,
            OS,
            Dimensions,
            weight,
            SIM,
            Colors,
            "2G Band": twoG,
            "3G Band": threeG,
            "4G Band": fourG,
            "5G Band": fiveG,
            CPU,
            Chipset,
            GPU,
            Technology,
            Size,
            Resolution,
            Protection,
            Extra_Features,
            Ram,
            Rom,
            Built_in,
            Card,    
            Main,
            Back_Cam,
            Features,
            Front_Cam,
            Front,
            WLAN,
            Bluetooth,
            GPS,
            Data,
            Sensors,
            Audio,
            Browser,
            Messaging,
            Games,
            Extra,
            Capacity,
            PriceInUsd,
            Radio
        });

        res.status(201).json({message: true,mobile});
        
    } catch (error) {
        
    }
}

// fetch search mobile
export const fetchSearchMobile = async (req, res) =>{
    try {
        const {model} = req.query;
        const filter = model ? {model: {$regex: model, $options: "i"}} : {};
        const mobiles = await Mobile.find(filter).limit(5);
        res.status(200).json(mobiles);

    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error:error.message})
    }
}