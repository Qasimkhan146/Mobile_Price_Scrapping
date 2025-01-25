import MobileDetails from "../model/mobileDetailsModel.js";

export const fetchSingleMobilePrice = async (req, res) => {
    try {
      const { model } = req.params;
      const mobile = await MobileDetails.findOne({ model: model });
      if (!mobile) {
        return res.status(404).json({ message: "Mobile not found" });
      }
      res.status(200).json(mobile);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });

    }
}

// fetch ten latest mobiles
export const fetch10LatestMobiles = async (req, res) => {
    try{
        const {model, brand, Ram, Rom, Back_Cam,Year} = req.query;
        const filterMobile = {};
        if(model){
            filterMobile.model = { $regex: model, $options: "i" };
        }
        if(brand){
            filterMobile.brand = { $regex: brand, $options: "i" };
        }
        if(Ram){
            filterMobile.Ram = parseInt(Ram);
        }
        if(Rom){
            filterMobile.Rom = parseInt(Rom);
        }
        if(Back_Cam){
            filterMobile.Back_Cam = parseInt(Back_Cam);
        }
        if(Year){
            const startOfYear = new Date(`${Year}-01-01T00:00:00.000Z`); // Start of the year
            const endOfYear = new Date(`${Year}-12-31T23:59:59.999Z`); // End of the year
            filterMobile.release = { $gte: startOfYear, $lte: endOfYear };
        }
        const mobiles = await MobileDetails.find(filterMobile).limit(10).sort({release: -1});
        if(!mobiles.length){
            return res.status(404).json({message:"Mobile not found"});
        }
        res.status(200).json(mobiles);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

//fetch10 latest mobiles with last object of update history
export const fetch10LatestMobilesWithHistory = async (req, res) => {
  try {
    const { model, brand, Ram, Rom, Back_Cam, Year } = req.query;
    const filterMobile = {};

    if (model) {
      filterMobile.model = { $regex: model, $options: "i" };
    }
    if (brand) {
      filterMobile.brand = { $regex: brand, $options: "i" };
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

    // Find the mobiles and include only the last object in updateHistory
    const mobiles = await MobileDetails.find(filterMobile)
      .limit(10)
      .sort({ release: -1 })
      .select({
        model: 1,
        img_url_mobilemate:1 ,
        mobilemate_price: 1,
        mobilemate_link: 1,
        priceoye_price: 1,
        priceoye_link: 1,
        whatmobile_price: 1,
        whatmobile_link: 1,
        hamariweb_price: 1,
        hamariweb_link: 1,
        daraz_price: 1,
        daraz_link: 1,
        updateHistory: { $slice: -1 }, // Include only the last element of the updateHistory

      });

    if (!mobiles.length) {
      return res.status(404).json({ message: "Mobile not found" });
    }

    res.status(200).json(mobiles);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


// fetch search mobile
export const fetchSearchMobile = async (req, res) =>{
    try {
        const {model} = req.query;
        const filter = model ? {model: {$regex: model, $options: "i"}} : {};
        const mobiles = await MobileDetails.find(filter).limit(5);
        res.status(200).json(mobiles);

    } catch (error) {
        res.status(500).json({message:"Internal Server Error",error:error.message})
    }
}

//Advace search mobiles
export const fetchAdvanceSearchApi = async (req, res) => {
    try {
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
  
      const totalMobiles = await MobileDetails.countDocuments(filterMobile);
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      const latestMobiles = await MobileDetails.find(filterMobile).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit));
  
      if (!latestMobiles.length) {
        return res.status(404).json({ message: "No mobiles found" });
      }
  
  
      res.status(200).json({
        latestMobiles,
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
  
      const mobiles = await MobileDetails.find(filterMobile).limit(10);
  
      if (mobiles.length === 0) {
        return res.status(404).json({ message: "No mobiles found matching the filters." });
      }
  
      // Return the results
      res.status(200).json(mobiles);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// update mobile
export const updateMobile = async (req, res) => {
  try {
    const { model } = req.params;

    // Find the mobile with an exact match for the model
    const mobile = await MobileDetails.findOne({ model: model });
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }

    // Update the mobile
    const updatedMobile = await MobileDetails.findOneAndUpdate(
      { model: model }, // Exact match filter
      req.body,
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedMobile);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export const fetchAllMobiles = async (req, res) => {
  try{
    const mobiles = await MobileDetails.find();
    if(!mobiles.length){
      return res.status(404).json({message:"No mobiles found"});
    }
    res.status(200).json(mobiles);
  }
  catch(error){
    res.status(500).json({message:"Internal Server Error",error:error.message})
  }
}

//update with history
export const updateMobileWithHistory = async (req, res) => {
  try {
    const { model } = req.params;
    const updates = req.body;

    console.log("Updates received:", updates);

    // Fetch the existing document to calculate the changelog
    const mobile = await MobileDetails.findOne({ model: new RegExp(model, "i") });
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }

    const mobileObject = mobile.toObject();
    const priceFields = [
      "mobilemate_price",
      "priceoye_price",
      "hamariweb_price",
      "whatmobile_price",
      "daraz_price",
    ];
    const changeLog = {};

    // Calculate the changelog only for price fields
    for (const key of priceFields) {
      if (mobile.schema.paths[key]) {
        changeLog[key] = {
          old: mobileObject[key],
          new: updates[key] !== undefined ? updates[key] : mobileObject[key],
        };
      }
    }

    // Add the changelog to the updateHistory and update the main document
    const updatedMobile = await MobileDetails.findOneAndUpdate(
      { model: new RegExp(model, "i") },
      {
        $set: updates,
        $push: {
          updateHistory: {
            updatedAt: new Date(),
            changes: changeLog,
          },
        },
      },
      { new: true, fields: priceFields.reduce((acc, field) => ({ ...acc, [field]: 1 }), {}) } // Only return the price fields
    );

    res.status(200).json({
      updatedPrices: changeLog,
      updatedMobile,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

//post comment on mobile
export const postCommentOnMobile = async (req, res) => {
  try {
    const { model } = req.params;
    const { name, email, comment } = req.body;

    console.log("for check", name, email, comment);

    const mobile = await MobileDetails.findOne({ model: new RegExp(model, "i") });
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }

    // Append the new comment to the existing array and set the updated array
    const updatedComments = [...mobile.comments, { name, email, comment }];

    const result = await MobileDetails.findOneAndUpdate(
      { model: model },
      { $set: { comments: updatedComments } }, // Overwrite comments array
      { new: true } // Return the updated document
    );

    console.log("result", result);
    res.status(200).json({ message: "Comment posted successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


//view comments on mobile

export const viewCommentsOnMobile = async (req, res) => {
  try{
    const { model } = req.params;
    const mobile = await MobileDetails.findOne({ model: new RegExp(model, "i") });
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }
    res.status(200).json({comments:mobile.comments});
  }catch(error){
    res.status(500).json({message:"Internal Server Error",error:error.message});
  }
}