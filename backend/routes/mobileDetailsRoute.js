import express from "express";
import { fetch10LatestMobiles, fetchAdvanceSearchApi, fetchAllMobiles, fetchSearchMobile, fetchSingleMobilePrice, updateMobile } from "../controller/mobileDetailsController.js";

const mobileDetailsRouter = express.Router();

mobileDetailsRouter.get("/fetchSingleMobile/:model",fetchSingleMobilePrice);
mobileDetailsRouter.get("/fetch10LatestMobiles", fetch10LatestMobiles);
mobileDetailsRouter.get("/fetchAllMobiles", fetchAllMobiles);
mobileDetailsRouter.get("/searchMobile",fetchSearchMobile);
mobileDetailsRouter.get("/fetchAdvanceFilters", fetchAdvanceSearchApi);
// mobileDetailsRouter.put("/updateMobile/:model",authenticateToken,authorizeRole("admin"),updateMobileAndPrices)
mobileDetailsRouter.put("/updateMobile/:model",updateMobile)


export default mobileDetailsRouter;