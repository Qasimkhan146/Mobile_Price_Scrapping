import express from "express";
import { getMobiles } from "../controllers/mobileController.js";

const router = express.Router();

router.get("/fetchAllMobiles", fetchAllMobiles);
router.get("/fetchSingleMobile/:id", fetchSingleMobile);
router.post("/uploadMobile", addMobile);
