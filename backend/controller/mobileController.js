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
      const threshold = 1;
      const {model, brand, Ram, Rom, Back_Cam} = req.query;
      const filterMobile = {};

      if (model) {
        filterMobile.model = new RegExp(model, "i");
      }

      if (brand) {
        filterMobile.brand = new RegExp(brand, "i");
      }

      if (Ram) {
        filterMobile.Ram = parseInt(Ram);
      }

      if (Rom) {
        filterMobile.Rom = parseInt(Rom);
      }

      if (Back_Cam) {
        filterMobile.Back_Cam = parseInt(Back_Cam);
      }

      const latestMobiles = await Mobile.find(filterMobile).sort({ createdAt: -1 }).limit(10);
      if (!latestMobiles.length) {
        return res.status(404).json({ message: "No mobiles found" });
      }
      const mobilesWithPrices = await Promise.all(
        latestMobiles.map(async (mobile) => {
          const allPrices = await Price.find(); 
          const matchingPrices = allPrices.filter((price) => {
            const similarity = stringSimilarity.compareTwoStrings(
              mobile.model.toLowerCase(),
              price.model.toLowerCase()
            );
            return similarity >= threshold;
          });

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

      res.status(200).json(mobilesWithPrices);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const fetchAdvanceSearchApi = async (req, res) => {
  try {
    const threshold = 1; // Adjust similarity threshold as needed
    const { model, brand, minRam,maxRam, minRom, maxRom, min_Back_Cam, max_Back_Cam,minPrice,maxPrice, page = 1, limit = 10 } = req.query;
    const filterMobile = {};

    if (model) {
      filterMobile.model = new RegExp(model, "i");
    }

    if (brand) {
      filterMobile.brand = new RegExp(brand, "i");
    }

    if(minRam && maxRam){
      filterMobile.Ram = { $gte: parseInt(minRam), $lte: parseInt(maxRam) };
    }
    if(minRom && maxRom){
      filterMobile.Rom = { $gte: parseInt(minRom), $lte: parseInt(maxRom) };
    }
    if(min_Back_Cam && max_Back_Cam){
      filterMobile.Back_Cam = { $gte: parseInt(min_Back_Cam), $lte: parseInt(max_Back_Cam) };
    }
    if(minPrice && maxPrice){
      filterMobile.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }

    const totalMobiles = await Mobile.countDocuments(filterMobile);
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const latestMobiles = await Mobile.find(filterMobile).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));

    if (!latestMobiles.length) {
      return res.status(404).json({ message: "No mobiles found" });
    }

    const mobilesWithPrices = await Promise.all(
      latestMobiles.map(async (mobile) => {
        const allPrices = await Price.find();
        const matchingPrices = allPrices.filter((price) => {
          const similarity = stringSimilarity.compareTwoStrings(
            mobile.model.toLowerCase(),
            price.model.toLowerCase()
          );
          return similarity >= threshold;
        });

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

    res.status(200).json({
      data: mobilesWithPrices,
      pagination: {
        total: totalMobiles,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(totalMobiles / limit),
      },
    });
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

//mobiles filters
export const fetchMobileFilters = async (req, res) => {
  try {
    const { brand, model, Ram, Rom, Back_Cam } = req.query;

    const filterMobile = {};

    if (brand) {
      filterMobile.brand = { $regex: brand, $options: "i" };
    }
    if (model) {
      filterMobile.model = { $regex: model, $options: "i" }; 
    }
    if (Ram) {
      filterMobile.Ram = parseInt(Ram); 
    }
    if (Rom) {
      filterMobile.Rom = parseInt(Rom); 
    }
    if (Back_Cam) {
      filterMobile.Back_Cam = parseInt(Back_Cam);
    }

    const mobiles = await Mobile.find(filterMobile).limit(10);

    if (mobiles.length === 0) {
      return res.status(404).json({ message: "No mobiles found matching the filters." });
    }

    // Return the results
    res.status(200).json(mobiles);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

