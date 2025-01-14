import {Router} from "express"
import { checkToken, loginUser, logoutUser, registerUser } from "../controller/authController.js";

const authRoute = Router();

authRoute.post("/register",registerUser);
authRoute.post("/login",loginUser);
authRoute.get("/logout",logoutUser);
authRoute.get("/DashboardAdmin",checkToken);

export default authRoute;