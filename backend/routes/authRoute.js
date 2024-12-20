import {Router} from "express"
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";
import { loginUser, registerUser } from "../controller/authController.js";

const authRoute = Router();

authRoute.post("/register",registerUser);
authRoute.post("/login",loginUser)

export default authRoute;