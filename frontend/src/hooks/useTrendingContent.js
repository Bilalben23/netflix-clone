import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

// there are two endpoints:
// => /api/v1/tv/trending
// => /api/v1/movie/trending

export default function useTrendingContent(media) {
    const axiosInstance = useAxios();

    const validMedia = ["movie", "tv"];
    if (!validMedia.includes(media)) {
        media = "movie";
    }

    return useQuery({
        queryKey: ["trendingContent", media],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/v1/${media}/trending`);
            return data;
        }
    })
}
