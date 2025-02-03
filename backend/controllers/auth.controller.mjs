import { hashPassword } from "../utils/bcryptUtils.mjs";
import { generateAccessToken, generateRefreshToken } from "../utils/jwtUtils.mjs";
import { User } from "../models/user.model.mjs"
import bcrypt from "bcrypt";
import { ENV_VARS } from "../config/envVars.mjs";


export const login = async (req, res) => {
    try {
        const { email, password, rememberMe } = req.body;

        const existingUser = await User.findOne({ email });
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
            secure: ENV_VARS.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/",
            maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000
        })


        res.status(200).json({
            success: true,
            message: "Login successfully",
            accessToken,
            user: {
                username: existingUser.username,
                email: existingUser.email
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
        const newUser = new User({ username, email, password: hashedPassword });
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


export const logout = async (req, res) => {
    try {

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: ENV_VARS.NODE_ENV !== "development",
            sameSite: "strict",
            path: "/"
        })

        res.status(200).json({
            success: true,
            message: "Logout successfully"
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}