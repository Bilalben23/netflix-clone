import { fetchFromTMDB } from "../services/tmdbService.mjs"

export const getTrendingMovie = async (req, res) => {
    const randomPage = Math.floor(Math.random() * 500) + 1;

    try {
        const movieData = await fetchFromTMDB(`/movie/popular?language=en-US&page=${randomPage}`);

        if (!movieData?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No Movies found"
            })
        }

        const randomIndex = Math.floor(Math.random() * movieData.results.length);
        const randomMovie = movieData.results[randomIndex];

        res.status(200).json({
            success: true,
            data: randomMovie
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getMoviesByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const validCategories = {
            popular: "popular",
            top_rated: "top_rated",
            upcoming: "upcoming",
            now_playing: "on_the_air"
        };

        if (!validCategories[category]) {
            return res.status(400).json({
                success: false,
                message: "Invalid category. Choose from: popular, top_rated, upcoming, now_playing."
            })
        }

        const movies = await fetchFromTMDB(`/movie/${category}?language=en-US&page=1`);

        if (!movies?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "NO movies found in this category"
            })
        }

        res.status(200).json({
            success: true,
            data: movies.results
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getMovieTrailers = async (req, res) => {
    const { id } = req.params;

    try {
        const movieData = await fetchFromTMDB(`/movie/${id}/videos?language=en-US`)

        if (!movieData?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No trailers found for this movie."
            })
        }

        res.status(200).json({
            success: true,
            data: movieData.results
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getMovieDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const movieDetails = await fetchFromTMDB(`/movie/${id}?language=en-US`);

        if (!movieDetails) {
            return res.status(404).json({
                success: false,
                message: "Movie details not found"
            })
        }

        res.status(200).json({
            success: true,
            data: movieDetails
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getSimilarMovies = async (req, res) => {
    const { id } = req.params;

    try {

        const similarMovies = await fetchFromTMDB(`/movie/${id}/similar?language=en-US&page=1`)

        if (!similarMovies?.results?.length) {
            res.status(404).json({
                success: false,
                message: "No Similar Movies found"
            })
        }

        res.status(200).json({
            success: true,
            data: similarMovies.results
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}