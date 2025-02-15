import axios from "axios";
import { ENV_VARS } from "../config/envVars.mjs";

export const fetchFromTMDB = async (endpoint) => {
    const url = `https://api.themoviedb.org/3${endpoint}`;

    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`
        }
    };

    try {
        const { data } = await axios.get(url, config);
        return data;
    } catch (err) {
        return null;
    }
};

