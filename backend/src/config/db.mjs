import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.mjs";


export const connectDB = async () => {
    try {
        await mongoose.connect(ENV_VARS.MONGO_URI);
        console.log("Connected successfully to mongoDB")

    } catch (err) {
        // 1 means there was an error, o means success
        console.log("Error connecting to mongoDB: " + err.message)
        process.exit(1);
    }
}

// cron jobs