import userModel from "../models/user.model.js";
import { redis } from "../lib/redis.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
    const accessToken = jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
    })

    const refreshToken = jwt.sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "7d",
    })

    return {accessToken, refreshToken};
}

// storing refresh token in redis
const storeRefreshToken = async (userId, refreshToken) => {
    await redis.set(`refresh_token: ${userId}`, refreshToken, "EX", 7*24*60*60) // 7 days in seconds
}

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // prevents XSS attack, cross site scripting attack
        secure:process.env.NODE_ENV === "production",
        sameSite: "strict", // prevents CSRF attack
        maxAge: 15 * 60 * 1000, // 15 minutes
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // prevents XSS attack, cross site scripting attack
        secure:process.env.NODE_ENV === "production",
        sameSite: "strict", // prevents CSRF attack
        maxAge: 7 * 24 * 60 * 60 * 1000, // 15 minutes
    })
}

// @desc to Sign up
// @path POST /api/auth/signup
// @access public
export const signup = async (req, res) => {
    const {name, email, password} = req.body;
    try{
        const userExists = await userModel.findOne({email})
        if(userExists){
            return res.status(400).json({message: "User already Exists"})
        }
        // passwrod will be already hashed
        const user = await userModel.create({name, email, password});

        // authenticate
        const { accessToken, refreshToken } = generateTokens(user._id);
        await storeRefreshToken(user._id, refreshToken);

        setCookies(res, accessToken, refreshToken);

        res.status(201).json({ user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            
        }, message: "User created successfully"});

    } catch(error){
        console.log("Error in Login Controller");
        res.status(500).json({message: error.message})
    }
};

// @desc to Login
// @path /api/auth/login
// @access public
export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if(user && (await user.comparePassword(password))){
            const {accessToken, refreshToken} = generateTokens(user._id);

            await storeRefreshToken(user._id, refreshToken);
            setCookies(res, accessToken, refreshToken);

            res.json({user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }, message: "User logged in succesfully"});
        } else {
            res.json(`Invalid email or password`);
        }
    } catch (error) {
        console.log(`Error in login controller`);
        res.status(500).json({message: "Server Error", error: error.message})
    }
}

// @desc to Logout
// @path /api/auth/logout
// @access public
export const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token: ${decoded.userId}`)
        }

        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({message: "Logged out Successfully"})
    } catch (error) {
        console.log("Error in Logout Controller");
        res.status(500).json({message: "Server error, error: error.message"});
    }
}

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken){
            return res.status(401).json({message: "No Refresh Token Provided"})
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const storedToken = await redis.get(`refresh_token: ${decoded.userId}`);

        if(storedToken !== refreshToken){
            return res.status(401).json({message: "Invalid Refresh Token"});
        }

        const accessToken = jwt.sign({userId: decoded.userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"});

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000,
        });

        res.json({message: "Token refreshed succesfully"});
    } catch (error) {
        console.log("Error in refreshToken controller", error.message);
        res.status(500).json({message: "Server error", error: error.message})
        
    }
}

// export const getProfile = (req, res) =>{

// }