import Mobile from "../model/mobileModel.js";
import Price from "../model/priceModel.js";
import stringSimilarity from "string-similarity";

export const fetchSingleMobilePrice = async (req, res) => {
  try {
    const { model } = req.params;

    const mobile = await Mobile.findOne({ model: new RegExp(model, "i") });
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }

    const allPrices = await Price.find();

    const threshold = 1; 
    const matchingPrices = allPrices.filter((price) => {
      const similarity = stringSimilarity.compareTwoStrings(
        mobile.model.toLowerCase(),
        price.model.toLowerCase()
      );
      return similarity >= threshold;
    });

    if (!matchingPrices.length) {
      return res.status(404).json({ message: "No matching prices found for this mobile" });
    }
  
    const priceDetails = matchingPrices.map((price) => ({
      source: price.source,
      price: price.price,
      href: price.href,
      hrefName: price.hrefName,
      brand: price.brand,
      model: price.model,

    }));
    res.status(200).json({ mobile, prices: priceDetails });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
// fetch 10 latest mobiles with their prices
export const fetch10LatestMobilesWithPrices = async (req, res) => {
    try {
      const threshold = 1;
      const {model, brand, Ram, Rom, Back_Cam,Year} = req.query;
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
      if (Year) {
        const startOfYear = new Date(`${Year}-01-01T00:00:00.000Z`); // Start of the year
        const endOfYear = new Date(`${Year}-12-31T23:59:59.999Z`); // End of the year
        filterMobile.release = { $gte: startOfYear, $lte: endOfYear };
      }

      const latestMobiles = await Mobile.find(filterMobile).sort({ release: -1 }).limit(10);
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
// advance search
export const fetchAdvanceSearchApi = async (req, res) => {
  try {
    const threshold = 1; // Adjust similarity threshold as needed
    const { model, brand, minRam,maxRam, minRom, maxRom, min_Back_Cam, max_Back_Cam,minPrice,maxPrice, page = 1, limit = 10, Year } = req.query;
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
    if (Year) {
      const startOfYear = new Date(`${Year}-01-01T00:00:00.000Z`); // Start of the year
      const endOfYear = new Date(`${Year}-12-31T23:59:59.999Z`); // End of the year
      filterMobile.release = { $gte: startOfYear, $lte: endOfYear };
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
    const { brand, model, Ram, Rom, Back_Cam ,Year} = req.query;

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
    if (Year) {
      const startOfYear = new Date(`${Year}-01-01T00:00:00.000Z`); // Start of the year
      const endOfYear = new Date(`${Year}-12-31T23:59:59.999Z`); // End of the year
      filterMobile.release = { $gte: startOfYear, $lte: endOfYear };
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

//update mobile
export const updateMobilesWithPrices = async (req, res) => {
  try {
    const { updates } = req.body; // Expect an array of mobile updates, each containing mobile details and prices.
    
    if (!updates || !Array.isArray(updates)) {
      return res.status(400).json({ message: "Invalid input format. 'updates' should be an array." });
    }

    const results = await Promise.all(
      updates.map(async (update) => {
        const { mobileId, model, brand, Ram, Rom, Back_Cam, prices } = update;

        if (!mobileId || !prices || !Array.isArray(prices)) {
          return { error: "Missing or invalid fields in update object", update };
        }

        // Update mobile details
        const updatedMobile = await Mobile.findByIdAndUpdate(
          mobileId,
          { model, brand, Ram, Rom, Back_Cam },
          { new: true, runValidators: true }
        );

        if (!updatedMobile) {
          return { error: "Mobile not found", mobileId };
        }

        // Update prices
        const priceUpdates = await Promise.all(
          prices.map(async (priceUpdate) => {
            const { source, price, href, hrefName, brand, model } = priceUpdate;

            if (!source || !price || !href) {
              return { error: "Missing fields in price update", priceUpdate };
            }

            const updatedPrice = await Price.findOneAndUpdate(
              { mobileId, source },
              { price, href, hrefName, brand, model },
              { new: true, upsert: true, runValidators: true }
            );

            return updatedPrice;
          })
        );

        return { updatedMobile, priceUpdates };
      })
    );

    res.status(200).json({ message: "Mobiles and prices updated successfully", results });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

export const updateMobileAndPrices = async (req, res) => {
  try {
    const { model } = req.params; 
    const { mobileData , prices } = req.body;

    if (mobileData && mobileData._id) {
      delete mobileData._id;
    }

    const mobile = await Mobile.findOne({ model: new RegExp(model, "i") });
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }
    const updateMobile = await Mobile.findOneAndUpdate(
      { model: new RegExp(model, "i") },
      mobileData,  
      { new: true }
    );

    if (!updateMobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }
    const allPrices = await Price.find({ model: mobile.model });

    if (prices && Array.isArray(prices)) {
      
      for (const price of prices) {
        
        const existingPrice = await Price.findOne({
          model: new RegExp(`^${price.model}$`, "i"),
          source: price.source,
        });

        if (existingPrice) {
          const updateResult = await Price.updateOne(
            {
              model: new RegExp(`^${price.model}$`, "i"),
              source: price.source,
            },
            { $set: price } 
          );
          console.log(updateResult, "Update Result");
        }
      }
    }

    res.status(200).json({ message: "Mobile and prices updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};
