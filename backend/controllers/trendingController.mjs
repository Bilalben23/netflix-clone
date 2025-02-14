import { fetchFromTMDB } from "../services/tmdbService.mjs";
import { SEARCH_TYPES } from "../utils/enums.mjs";

export const getTrendingContent = async (req, res, type) => {
    try {
        const endpoint = `/trending/${type}/week?language=en-US`;
        const data = await fetchFromTMDB(endpoint);

        res.status(200).json({
            success: true,
            data: data?.results
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getTrendingMovies = (req, res) => getTrendingContent(req, res, SEARCH_TYPES.MOVIE);

export const getTrendingTvShows = (req, res) => getTrendingContent(req, res, SEARCH_TYPES.TV);

export const getTrendingPeople = (req, res) => getTrendingContent(req, res, SEARCH_TYPES.PERSON);




