import express from "express";
import { createMobile, fetch10LatestMobilesWithPrices, fetchSearchMobile, fetchSingleMobilePrice } from "../controller/mobileController.js";
import { upload } from "../config/cloudinaryConfig.js";

const mobileRouter = express.Router();

// mobileRouter.get("/fetchAllMobiles", fetchAllMobiles);
mobileRouter.get("/fetchSingleMobile/:model", fetchSingleMobilePrice);
mobileRouter.get("/fetch10LatestMobiles", fetch10LatestMobilesWithPrices);
mobileRouter.get("/searchMobile",fetchSearchMobile);
mobileRouter.post("/createMobile",upload.single("image"), createMobile);

export default mobileRouter;
