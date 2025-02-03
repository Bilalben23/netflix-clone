import express from 'express';
import { ENV_VARS } from './config/envVars.mjs';
import { connectDB } from './config/db.mjs';
import passport from 'passport';
import helmet from "helmet";
import cors from "cors";
import cookieParser from 'cookie-parser';
import { configurePassport } from './config/passport.mjs';
import authRoutes from "./routes/auth.route.mjs"
import movieRoutes from "./routes/movie.route.mjs"
import tvRoutes from "./routes/tv.route.mjs"
import searchRoutes from "./routes/search.route.mjs"
import { authenticateJWT } from './middlewares/auth.middleware.mjs';



const app = express();
app.use(express.json()); // will allow use to parse req.body
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Accept"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));
configurePassport();
app.use(passport.initialize());
app.use(cookieParser());


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", authenticateJWT, movieRoutes);
app.use("/api/v1/tv", authenticateJWT, tvRoutes);
app.use("/api/v1/search", authenticateJWT, searchRoutes);




const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
    console.log(`Server started at https://localhost:${PORT}`);
    connectDB();
})