import express from "express";
import { createMobile, fetch10LatestMobilesWithPrices, fetchMobileFilters, fetchSearchMobile, fetchSingleMobilePrice } from "../controller/mobileController.js";
import { upload } from "../config/cloudinaryConfig.js";

const mobileRouter = express.Router();

// mobileRouter.get("/fetchAllMobiles", fetchAllMobiles);
mobileRouter.get("/fetchSingleMobile/:model", fetchSingleMobilePrice);
mobileRouter.get("/searchMobile",fetchSearchMobile);
mobileRouter.get("/fetch10LatestMobiles", fetch10LatestMobilesWithPrices);
mobileRouter.post("/createMobile",upload.single("image"), createMobile);
mobileRouter.get("/mobileFilters",fetchMobileFilters);
export default mobileRouter;
