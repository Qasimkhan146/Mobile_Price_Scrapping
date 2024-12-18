import express from "express";
import { fetch10LatestMobilesWithPrices, fetchSingleMobilePrice } from "../controller/mobileController.js";

const mobileRouter = express.Router();

// mobileRouter.get("/fetchAllMobiles", fetchAllMobiles);
mobileRouter.get("/fetchSingleMobile/:model", fetchSingleMobilePrice);
mobileRouter.get("/fetch10LatestMobiles", fetch10LatestMobilesWithPrices);
// mobileRouter.post("/uploadMobile", addMobile);

export default mobileRouter;
