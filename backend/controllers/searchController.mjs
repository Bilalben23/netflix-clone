import { User } from "../models/userModel.mjs";
import { fetchFromTMDB } from "../services/tmdbService.mjs";
import { SEARCH_TYPES } from "../utils/enums.mjs";


const updateSearchHistory = async (userId, reference_id, image, title, searchType) => {
    try {
        const user = await User.findById(userId);
        if (!user) return;
        const exists = user.searchHistory.some(item => item.reference_id === reference_id);

        if (!exists) {
            if (user.searchHistory.length >= 60) {
                user.searchHistory.shift();
            }

            user.searchHistory.push({
                reference_id,
                image,
                title,
                searchType
            })

            await user.save();
        }

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const searchEntity = async (req, res, type) => {
    const { query } = req.query;

    if (!query || query.trim() === "") {
        return res.status(400).json({
            success: false,
            message: "Search query cannot be empty"
        })
    }

    const endpoint = `/search/${type}?query=${query}&include_adult=false&language=en-US&page=1`;

    try {
        const data = await fetchFromTMDB(endpoint);

        if (!data.results?.length) {
            return res.status(404).json({
                success: false,
                message: `No results found for ${type}.`
            })
        }

        const firstResult = data.results[0];
        const referencedId = firstResult.id;
        const image = firstResult?.poster_path || firstResult?.profile_path;
        const title = firstResult.title || firstResult.name;
        const searchType = SEARCH_TYPES[type.toUpperCase()];

        await updateSearchHistory(req.user._id, referencedId, image, title, searchType);

        res.status(200).json({
            success: true,
            message: `Found ${data.results.length} result(s) for ${type}: "${query}".`,
            data: data.results
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const searchPerson = (req, res) => searchEntity(req, res, SEARCH_TYPES.PERSON);
export const searchMovie = (req, res) => searchEntity(req, res, SEARCH_TYPES.MOVIE);
export const searchTv = (req, res) => searchEntity(req, res, SEARCH_TYPES.TV);

export const getSearchHistory = async (req, res) => {
    try {
        const page = parseInt(req.query?.page) || 1;
        const limit = 12;
        const searchHistory = req.user?.searchHistory || [];

        const totalItems = searchHistory.length;
        const totalPages = Math.ceil(totalItems / limit);
        const currentPage = Math.min(Math.max(1, page), totalPages || 1);
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedHistory = searchHistory.slice(startIndex, endIndex);

        res.status(200).json({
            success: true,
            pagination: {
                currentPage,
                totalPages,
                totalItems,
                hasMore: currentPage < totalPages
            },
            data: paginatedHistory
        });

    } catch (err) {
        console.error("Error fetching search history:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


export const removeItemFromSearchHistory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Item ID is required."
            })
        }

        const result = await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: {
                    searchHistory: {
                        _id: id
                    }
                }
            }, { new: true }
        )

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "user not found."
            })
        }

        res.status(200).json({
            success: true,
            message: "Item removed successfully from search history.",
            data: result.searchHistory
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
