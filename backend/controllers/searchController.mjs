import { User } from "../models/userModel.mjs";
import { fetchFromTMDB } from "../services/tmdbService.mjs";


export const searchPerson = async (req, res) => {
    const { query } = req.params;

    if (!query || query.trim() === '') {
        return res.status(400).json({
            success: true,
            message: "Search query cannot be empty"
        })
    }

    try {
        const data = await fetchFromTMDB(`/search/person?query=${query}&include_adult=false&language=en-US&page=1`)

        if (!data?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No results found for the searched person."
            })
        }

        const personInHistory = await User.findOne({
            _id: req.user._id,
            "searchHistory.id": data.results[0].id
        })

        if (!personInHistory) {
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
        }

        res.status(200).json({
            success: true,
            message: `Found ${data.results.length} result(s) for person: ${query}.`,
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

    if (!query || query.trim() === '') {
        return res.status(400).json({
            success: true,
            message: "Search query cannot be empty"
        })
    }

    try {
        const data = await fetchFromTMDB(`/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);

        if (!data?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No results found for the searched movie."
            })
        }

        const firstMovie = data.results[0];

        const movieInHistory = await User.findOne({
            _id: req.user._id,
            "searchHistory": firstMovie.id
        })

        if (!movieInHistory) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: firstMovie.id,
                        image: firstMovie.poster_path,
                        title: firstMovie.title,
                        searchType: "movie",
                        createdAt: Date.now()
                    }
                }
            })
        }

        res.status(200).json({
            success: true,
            message: `Found ${data.results.length} result(s) for movie: "${query}".`,
            data: data.results
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const searchTv = async (req, res) => {
    const { query } = req.params;

    if (!query || query.trim() === '') {
        return res.status(400).json({
            success: true,
            message: "Search query cannot be empty"
        })
    }

    try {
        const data = await fetchFromTMDB(`/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);


        if (!data?.results?.length) {
            return res.status(404).json({
                success: false,
                message: "No results found for the searched movie."
            })
        }

        const firstTv = data.results[0];


        const tvInHistory = await User.findOne({
            _id: req.user._id,
            "searchHistory.id": firstTv.id
        })

        if (!tvInHistory) {
            await User.findByIdAndUpdate(req.user._id, {
                $push: {
                    searchHistory: {
                        id: firstTv.id,
                        image: firstTv.poster_path,
                        title: firstTv.name,
                        searchType: "tv",
                        createdAt: Date.now()
                    }
                }
            })
        }


        res.status(200).json({
            success: true,
            message: `Found ${data.results.length} result(s) for TV show: "${query}".`,
            data: data.results
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getSearchHistory = async (req, res) => {
    try {

        if (!req.user.searchHistory.length) {
            return res.status(404).json({
                success: false,
                message: "No search history found."
            });
        }

        res.status(200).json({
            success: true,
            data: req.user.searchHistory
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const removeItemFromSearchHistory = async (req, res) => {
    const { id } = req.params;
    try {
        // Find the user and remove the item from searchHistory
        const result = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { searchHistory: { id: +id } } },
            { new: true }
        );

        // Check if the item was actually removed
        if (!result.searchHistory.find(item => item.id === +id)) {
            return res.status(404).json({
                success: false,
                message: "Item not found in search history"
            });
        }

        res.status(200).json({
            success: true,
            message: "Item removed successfully from search history",
            data: result.searchHistory
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
