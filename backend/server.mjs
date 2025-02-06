import express from 'express';
import { ENV_VARS } from './config/envVars.mjs';
import { connectDB } from './config/db.mjs';
import passport from 'passport';
import helmet from "helmet";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { configurePassport } from './config/passport.mjs';
import authRoutes from "./routes/authRoutes.mjs";
import movieRoutes from "./routes/movieRoutes.mjs";
import tvRoutes from "./routes/tvRoutes.mjs";
import searchRoutes from "./routes/searchRoutes.mjs";
import { authenticateJWT } from './middlewares/authMiddleware.mjs';
import { errorHandler } from './middlewares/errorHandler.mjs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// CORS Setup
app.use(cors({
    origin: "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Accept", "Authorization", "X-Requested-With"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // allows cookies to be sent
}));

// Initialize Passport.js for Authentication
configurePassport();
app.use(passport.initialize());
app.use(cookieParser());


// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", authenticateJWT, movieRoutes);
app.use("/api/v1/tv", authenticateJWT, tvRoutes);
app.use("/api/v1/search", authenticateJWT, searchRoutes);

app.use(errorHandler);

const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    connectDB();
});