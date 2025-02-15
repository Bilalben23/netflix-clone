import { fetchFromTMDB } from "../services/tmdbService.mjs";

export const getPersonDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const personDetails = await fetchFromTMDB(`/person/${id}`);

        res.status(200).json({
            success: true,
            data: personDetails
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getPersonImages = async (req, res) => {
    const { id } = req.params;

    try {
        const personImages = await fetchFromTMDB(`/person/${id}/images`);

        res.status(200).json({
            success: true,
            data: personImages?.profiles
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const getMovieCredits = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`/person/${id}/movie_credits`);

        res.status(200).json({
            success: true,
            data
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}
export const getTvCredits = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`/person/${id}/movie_credits`);

        res.status(200).json({
            success: true,
            data
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}