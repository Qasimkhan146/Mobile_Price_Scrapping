import { Router } from "express";
import { fetchAllBrands } from "../controller/brandController.js";

const brandRouter = Router();

brandRouter.get("/fetchAllBrands", fetchAllBrands);

export default brandRouter;