import express from "express";
import { fetchSingleMobilePrice } from "../controller/mobileController.js";

const mobileRouter = express.Router();

// mobileRouter.get("/fetchAllMobiles", fetchAllMobiles);
mobileRouter.get("/fetchSingleMobile/:id", fetchSingleMobilePrice);
// mobileRouter.post("/uploadMobile", addMobile);

export default mobileRouter;
