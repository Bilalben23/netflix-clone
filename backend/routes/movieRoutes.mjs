import { Router } from "express";
import {
    getTrendingMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMoviesByCategory
} from "../controllers/movieController.mjs";


const router = Router();

router.get("/trending", getTrendingMovie);

router.get("/category/:category", getMoviesByCategory);

// for getting movie trailers by movie ID
router.get("/:id/trailers", getMovieTrailers);

// for getting movie details by movie ID
router.get("/:id/details", getMovieDetails);

// for getting similar movies by movie ID
router.get("/:id/similar", getSimilarMovies);


export default router;

