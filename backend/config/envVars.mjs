import dotenv from "dotenv";

dotenv.config();

export const ENV_VARS = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT || 5000,
    REFRESH_SECRET_TOKEN: process.env.REFRESH_SECRET_TOKEN,
    ACCESS_SECRET_TOKEN: process.env.ACCESS_SECRET_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    FRONTEND_URL: process.env.FRONTEND_URL
}