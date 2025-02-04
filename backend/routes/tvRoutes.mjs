import { Router } from "express";
import {
    getTrendingTv,
    getTvsByCategory,
    getTvTrailers,
    getTvDetails,
    getSimilarTvs

} from "../controllers/tvController.mjs";

const router = Router();

router.get("/trending", getTrendingTv);

router.get("/category/:category", getTvsByCategory);

router.get("/:id/trailers", getTvTrailers);

router.get("/:id/details", getTvDetails);

router.get("/:id/similar", getSimilarTvs);

export default router; 