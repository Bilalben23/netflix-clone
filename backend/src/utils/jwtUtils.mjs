import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.mjs";


// Access token: short lifespan
export function generateAccessToken(payload) {
    return jwt.sign({
        id: payload._id,
        username: payload.username,
        email: payload.email
    },
        ENV_VARS.ACCESS_SECRET_TOKEN,
        {
            expiresIn: "15m"
        })
}


// refresh token: longer lifespan
export function generateRefreshToken(payload, rememberMe = false) {
    return jwt.sign({
        id: payload._id
    },
        ENV_VARS.REFRESH_SECRET_TOKEN,
        {
            expiresIn: rememberMe ? "30d" : "7d"
        }
    )
}