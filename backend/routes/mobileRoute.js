import express from "express";
import { fetchSingleMobilePrice } from "../controller/mobileController.js";

const mobileRouter = express.Router();

// mobileRouter.get("/fetchAllMobiles", fetchAllMobiles);
mobileRouter.get("/fetchSingleMobile/:model", fetchSingleMobilePrice);
// mobileRouter.post("/uploadMobile", addMobile);

export default mobileRouter;
