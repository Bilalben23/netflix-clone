import { User } from "../models/userModel.mjs";
import { fetchFromTMDB } from "../services/tmdb.service.mjs";

export const searchPerson = async (req, res) => {
    const { query } = req.params;
    try {
        const data = await fetchFromTMDB(`/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        if (!data || !data.results || !data?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No results found for the searched person."
            })
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "person",
                    createdAt: Date.now()
                }
            }
        })

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


export const searchMovie = async (req, res) => {
    const { query } = req.params;
    try {
        const data = await fetchFromTMDB(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (!data || !data.results || !data?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No results found for the searched movie."
            })
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].title,
                    searchType: "movie",
                    createdAt: Date.now()
                }
            }
        })

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

export const searchTv = async (req, res) => {
    const { query } = req.params;

    try {
        const data = await fetchFromTMDB(`/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);


        if (!data || !data.results || !data?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No results found for the searched movie."
            })
        }

        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].name,
                    searchType: "movie",
                    createdAt: Date.now()
                }
            }
        })


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


export const getSearchHistory = async (req, res) => {
    try {

        res.status(200).json({
            success: true,
            data: req.user.searchHistory
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const removeItemFromSearchHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { searchHistory: { id: +id } } },
            { new: true }
        );


        res.status(200).json({
            success: true,
            message: "Item removed successfully from search history"
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}