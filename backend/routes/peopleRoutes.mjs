import { Router } from "express";
import {
    getPersonDetails,
    getPersonImages,
    getMovieCredits,
    getTvCredits
} from "../controllers/peopleController.mjs";

const router = Router();


router.get("/:id", getPersonDetails);

router.get("/:id/images", getPersonImages);

router.get("/:id/movie_credits", getMovieCredits);

router.get("/:id/tv_credits", getTvCredits);

export default router;