import { Router } from "express";
import {
    searchPerson,
    searchMovie,
    searchTv,
    getSearchHistory,
    removeItemFromSearchHistory
} from "../controllers/searchController.mjs";


const router = Router();

router.get("/person", searchPerson);

router.get("/movie", searchMovie);

router.get("/tv", searchTv);

router.get("/history", getSearchHistory);

router.delete("/history/:id", removeItemFromSearchHistory)

export default router;