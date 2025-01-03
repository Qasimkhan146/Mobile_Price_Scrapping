import express from "express";
import { createMobile, fetch10LatestMobilesWithPrices, fetchAdvanceSearchApi, fetchMobileFilters,  fetchSearchMobile, fetchSingleMobilePrice, updateMobileAndPrices} from "../controller/mobileController.js";
import { upload } from "../config/cloudinaryConfig.js";
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const mobileRouter = express.Router();

// mobileRouter.get("/fetchAllMobiles", fetchAllMobiles);
mobileRouter.get("/fetchSingleMobile/:model", fetchSingleMobilePrice);
mobileRouter.get("/searchMobile",fetchSearchMobile);
mobileRouter.get("/fetch10LatestMobiles", fetch10LatestMobilesWithPrices);
mobileRouter.get("/fetchAdvanceFilters", fetchAdvanceSearchApi);
mobileRouter.post("/createMobile",upload.single("image"), createMobile);
mobileRouter.get("/mobileFilters",fetchMobileFilters);
// mobileRouter.put("/updateMobile/:model",fetchMobileWithPriceById)
mobileRouter.put("/updateMobile/:model",authenticateToken,authorizeRole("admin"),updateMobileAndPrices)
export default mobileRouter;
