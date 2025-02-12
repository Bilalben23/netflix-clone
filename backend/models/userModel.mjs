import mongoose from "mongoose";
import { SEARCH_TYPES } from "../utils/enums.mjs";


const searchHistorySchema = new mongoose.Schema({
    reference_id: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    title: {
        type: String,
        required: true,
    },
    searchType: {
        type: String,
        enum: [SEARCH_TYPES.MOVIE, SEARCH_TYPES.TV, SEARCH_TYPES.PERSON]
    }
}, { timestamps: true })



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    searchHistory: {
        type: [searchHistorySchema], // embedded schema
        default: []
    }
}, { timestamps: true })

export const User = mongoose.model('User', userSchema);