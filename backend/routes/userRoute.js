import {Router} from "express"
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const userRoute = Router();

userRoute.get("/adminRoute",authenticateToken,authorizeRole("admin"), )

export default userRoute;