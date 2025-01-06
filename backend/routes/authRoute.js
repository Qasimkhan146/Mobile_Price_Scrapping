import {Router} from "express"
import { loginUser, registerUser } from "../controller/authController.js";

const authRoute = Router();

authRoute.post("/register",registerUser);
authRoute.post("/login",loginUser)

export default authRoute;