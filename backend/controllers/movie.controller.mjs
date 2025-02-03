import { fetchFromTMDB } from "../services/tmdb.service.mjs"

export const getTrendingMovie = async (req, res) => {
    try {
        const data = await fetchFromTMDB("/movie/popular?language=en-US&page=1");
        const randomMovie = data?.results[Math.floor(Math.random() * data?.results?.length)];

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


export const getMovieTrailers = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`/movie/${id}/videos?language=en-US`)

        if (!data || !data?.results || data?.results?.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No trailers found for this movie."
            });
        }

        res.status(200).json({
            success: true,
            trailers: data.results
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
        const data = await fetchFromTMDB(`/movie/${id}?language=en-US`);
        console.log(data);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "No Movie details found"
            })
        }

        res.status(200).json({
            success: true,
            data
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

        const data = await fetchFromTMDB(`/movie/${id}/similar?language=en-US&page=1`)

        if (!data || !data?.results || data?.results?.length === 0) {
            res.status(404).json({
                success: false,
                message: "No Similar Movies found"
            })
        }

        res.status(200).json({
            success: true,
            data: data.results
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
        const data = await fetchFromTMDB(`/movie/${category}?language=en-US&page=1`);

        if (!data || !data?.results || data?.results?.length === 0) {
            return res.status(404).json({
                success: true,
                message: "NO movies wer found in this category"
            })
        }

        res.status(200).json({
            success: true,
            data: data.results
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

