import { Router } from "express";
import {
    getPopularMovie,
    getMovieTrailers,
    getMovieDetails,
    getSimilarMovies,
    getMoviesByCategory
} from "../controllers/movieController.mjs";


const router = Router();

router.get("/popular", getPopularMovie);

router.get("/category/:category", getMoviesByCategory);

// for getting movie trailers by movie ID
router.get("/:id/trailers", getMovieTrailers);

// for getting movie details by movie ID
router.get("/:id/details", getMovieDetails);

// for getting similar movies by movie ID
router.get("/:id/similar", getSimilarMovies);


export default router;

