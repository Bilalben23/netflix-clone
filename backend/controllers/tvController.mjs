import { fetchFromTMDB } from "../services/tmdb.service.mjs"

export const getTrendingTv = async (req, res) => {
    try {
        const data = await fetchFromTMDB("/tv/popular?language=en-US&page=1");
        const randomTv = data?.results[Math.floor(Math.random() * data?.results?.length)];

        res.status(200).json({
            success: true,
            data: randomTv
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getTvTrailers = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`/tv/${id}/videos?language=en-US`)

        if (!data || !data?.results || data?.results?.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No trailers found for this tv."
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


export const getTvDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`/tv/${id}?language=en-US`);
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "No Tv details found"
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



export const getSimilarTvs = async (req, res) => {
    const { id } = req.params;

    try {

        const data = await fetchFromTMDB(`/tv/${id}/similar?language=en-US&page=1`)

        if (!data || !data?.results || data?.results?.length === 0) {
            res.status(404).json({
                success: false,
                message: "No Similar TV found"
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



export const getTvsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`/tv/${category}?language=en-US&page=1`);

        if (!data || !data?.results || data?.results?.length === 0) {
            return res.status(404).json({
                success: true,
                message: "NO Tvs were found in this category"
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

