import express from "express";
import { fetch10LatestMobiles, fetch10LatestMobilesWithHistory, fetchAdvanceSearchApi, fetchAllMobiles, fetchSearchMobile, fetchSingleMobilePrice, updateMobile, updateMobileWithHistory } from "../controller/mobileDetailsController.js";
// import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const mobileDetailsRouter = express.Router();

mobileDetailsRouter.get("/fetchSingleMobile/:model",fetchSingleMobilePrice);
mobileDetailsRouter.get("/fetch10LatestMobiles", fetch10LatestMobiles);
mobileDetailsRouter.get("/fetch10LatestMobilesWithHistory", fetch10LatestMobilesWithHistory );
mobileDetailsRouter.get("/fetchAllMobiles", fetchAllMobiles);
mobileDetailsRouter.get("/searchMobile",fetchSearchMobile);
mobileDetailsRouter.get("/fetchAdvanceFilters", fetchAdvanceSearchApi);
// mobileDetailsRouter.put("/updateMobile/:model",authenticateToken,authorizeRole("admin"),updateMobileAndPrices)
mobileDetailsRouter.put("/updateMobile/:model",updateMobile)
mobileDetailsRouter.put("/updateMobileWithHistory/:model",updateMobileWithHistory)


export default mobileDetailsRouter;