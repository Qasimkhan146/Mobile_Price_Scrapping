import {Router} from "express"
import { authenticateToken, authorizeRole } from "../middleware/authMiddleware.js";

const userRoute = Router();

userRoute.get("/adminRoute",authenticateToken,authorizeRole("admin"),(req, res)=>{
    res.status(200).json({message:"admin route access granted"})
} )

export default userRoute;