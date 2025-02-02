import express from 'express';
import authRoutes from "./routes/auth.route.mjs"
import { configDotenv } from 'dotenv';
import { ENV_VARS } from './config/envVars.mjs';
import { connectDB } from './config/db.mjs';
configDotenv();


const app = express();
app.use(express.json()); // will allow use to parse req.body

app.use("/api/v1/auth", authRoutes);


const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
    console.log(`Server started at https://localhost:${PORT}`);
    connectDB();
})