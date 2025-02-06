import { hashPassword } from "../utils/bcryptUtils.mjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtils.mjs";
import { User } from "../models/userModel.mjs"
import bcrypt from "bcrypt";
import { ENV_VARS } from "../config/envVars.mjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    try {
        const { username, password, rememberMe } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser || !(await bcrypt.compare(password, existingUser.password))) {
            return res.status(400).json({
                success: false,
                message: "Incorrect credentials"
            })
        }

        const refreshToken = generateRefreshToken(existingUser, rememberMe)
        const accessToken = generateAccessToken(existingUser)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: ENV_VARS.NODE_ENV === "production", // Only send over HTTPS in production
            sameSite: ENV_VARS.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000
        })


        res.status(200).json({
            success: true,
            message: "Login successfully",
            accessToken,
            user: {
                username: existingUser.username,
                email: existingUser.email,
                image: existingUser.image
            }
        })


    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const signup = async (req, res) => {
    const avatars = ["/avatar1.jpg", "/avatar2.jpg", "/avatar3.jpg"];
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: existingUser.username === username
                    ? "Username is already taken"
                    : "Email is already taken"
            })
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            image: avatars[Math.floor(Math.random() * avatars.length)]
        });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const refreshToken = (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({
            success: false,
            message: "No refresh token provided"
        })
    }

    try {

        jwt.verify(refreshToken, ENV_VARS.REFRESH_SECRET_TOKEN, async (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid refresh token"
                })
            }

            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }

            // generate new access token,
            const newAccessToken = generateAccessToken(user);

            res.status(200).json({
                success: true,
                accessToken: newAccessToken,
                user: {
                    username: user.username,
                    email: user.email,
                    image: user.image
                }
            })
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const logout = async (req, res) => {
    console.log("Logout...")
    try {

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(400).json({
                success: true,
                message: "No active session found, user is already logged out"
            })
        }


        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: ENV_VARS.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/"
        })


        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}