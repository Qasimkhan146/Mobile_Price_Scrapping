import jwt from "jsonwebtoken"

//role authentication
export const authorizeRole = (requiredRole) =>{
    return (req , res, next)=>{
        if(req.user.role !== requiredRole ){
            res.status(403).json({message:"access denied , insufficient permission"})
        }
        next()
    }
}

export const authenticateToken = (req,res,next) =>{
    let token ;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];
        if(!token){
            res.status(404).json({message:"access failed , token not found"})
        }
    } 
    // const token = req.headers.authorization?.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(404).json({message:"access failed , invalid token"})
    }
}