import { fetchFromTMDB } from "../services/tmdbService.mjs"

export const getTrendingTv = async (req, res) => {
    const randomPage = Math.floor(Math.random() * 500) + 1;

    try {
        const tvData = await fetchFromTMDB(`/tv/popular?language=en-US&page=${randomPage}`);

        if (!tvData?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No tvs found"
            })
        }

        const randomIndex = Math.floor(Math.random() * tvData.results.length);
        const randomTv = tvData.results[randomIndex];

        res.status(200).json({
            success: true,
            data: randomTv
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



export const getTvsByCategory = async (req, res) => {
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

        const tvs = await fetchFromTMDB(`/tv/${category}?language=en-US&page=1`);

        if (!tvs?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "NO TV Shows found in this category"
            })
        }

        res.status(200).json({
            success: true,
            data: tvs.results
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getTvTrailers = async (req, res) => {
    const { id } = req.params;

    try {
        const tvData = await fetchFromTMDB(`/tv/${id}/videos?language=en-US`)
        console.log(tvData);
        if (!tvData?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No trailers found for this TV show"
            });
        }

        res.status(200).json({
            success: true,
            trailers: tvData.results
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getTvDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const tvShowDetails = await fetchFromTMDB(`/tv/${id}?language=en-US`);
        if (!tvShowDetails) {
            return res.status(404).json({
                success: false,
                message: "No TV Show details found for this given ID"
            })
        }

        res.status(200).json({
            success: true,
            data: tvShowDetails
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getSimilarTvs = async (req, res) => {
    const { id } = req.params;

    try {

        const similarTvs = await fetchFromTMDB(`/tv/${id}/similar?language=en-US&page=1`)

        if (!similarTvs?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No Similar TV found for this given ID."
            })
        }

        res.status(200).json({
            success: true,
            data: similarTvs.results
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}