import MobileDetails from "../model/mobileDetailsModel.js";

export const fetchSingleMobilePrice = async (req, res) => {
    try {
      const { model } = req.params;
      const mobile = await MobileDetails.findOne({ model: new RegExp(model, "i") });
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
        const mobiles = await MobileDetails.find().limit(10).sort({release: -1});
        res.status(200).json(mobiles);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

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
    const mobile = await MobileDetails.findOne({ model: new RegExp(model, "i") });
    if (!mobile) {
      return res.status(404).json({ message: "Mobile not found" });
    }
    const updatedMobile = await MobileDetails.findOneAndUpdate(
      { model: new RegExp(model, "i") },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedMobile);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};