import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({message: "Unauthorized"})
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await userModel.findById(decoded.userId).select("-password");

            if(!user){
                return res.status(401).json({message: "User not found"});
            }

            req.user = user;
            next();

        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({message: "Unauthorized"})
            } 
            throw error;
        }
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(401).json({message: "Unauthorized"})
    }
}


export const adminRoute = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    } else {
        return res.status(404).json({message: "Unauthorized - Admin only"})
    }
}