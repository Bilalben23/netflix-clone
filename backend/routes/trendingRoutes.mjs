import { Router } from "express";
import {
    getTrendingMovies,
    getTrendingPeople,
    getTrendingTvShows
} from "../controllers/trendingController.mjs";

const router = Router();

router.get("/movies", getTrendingMovies);

router.get("/tvs", getTrendingTvShows);

router.get("/people", getTrendingPeople);

export default router;