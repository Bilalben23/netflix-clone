import { Router } from "express";
import {
    getTrendingTv,
    getTvTrailers,
    getTvDetails,
    getSimilarTvs,
    getTvsByCategory
} from "../controllers/tv.controller.mjs";

const router = Router();

router.get("/trending", getTrendingTv);

router.get("/:id/trailers", getTvTrailers);

router.get("/:id/details", getTvDetails);

router.get("/:id/similar", getSimilarTvs);

router.get("/:category", getTvsByCategory);


export default router; 