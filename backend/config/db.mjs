import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.mjs";


export const connectDB = async () => {
    try {
        await mongoose.connect(ENV_VARS.MONGO_URI);


    } catch (err) {
        // 1 means there was an error, o means success
        process.exit(1);
    }
} 