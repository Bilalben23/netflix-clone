import express from 'express';
import { ENV_VARS } from './config/envVars.mjs';
import { connectDB } from './config/db.mjs';
import passport from 'passport';
import helmet from "helmet";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { configurePassport } from './config/passport.mjs';
import { authenticateJWT } from './middlewares/authMiddleware.mjs';
import { errorHandler } from './middlewares/errorHandler.mjs';
import authRoutes from "./routes/authRoutes.mjs";
import movieRoutes from "./routes/movieRoutes.mjs";
import tvRoutes from "./routes/tvRoutes.mjs";
import searchRoutes from "./routes/searchRoutes.mjs";
import trendingRoutes from "./routes/trendingRoutes.mjs";
import peopleRoutes from "./routes/peopleRoutes.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));

// CORS Setup
app.use(cors({
    origin: ENV_VARS.FRONTEND_URL || "http://localhost:5173",
    allowedHeaders: ["Content-Type", "Accept", "Authorization", "X-Requested-With"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true, // allows cookies to be sent
}));


// Initialize Passport.js for Authentication
app.use(passport.initialize());
configurePassport();
app.use(cookieParser());

connectDB();

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", authenticateJWT, movieRoutes);
app.use("/api/v1/tv", authenticateJWT, tvRoutes);
app.use("/api/v1/search", authenticateJWT, searchRoutes);
app.use("/api/v1/trending", authenticateJWT, trendingRoutes);
app.use("/api/v1/people", peopleRoutes)

app.use(errorHandler);

//app.listen(ENV_VARS.PORT, () => {
//   console.log(`Server started at http://localhost:${ENV_VARS.PORT}`);
//   connectDB();
//})



export default app;

