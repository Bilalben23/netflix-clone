import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

// there are two endpoints:
// => /api/v1/tv/trending
// => /api/v1/movie/trending

export default function useTrendingContent(category) {
    const axiosInstance = useAxios();

    console.log(category);

    const validCategories = ["movie", "tv"];
    if (!validCategories.includes(category)) {
        category = "movie";
    }

    return useQuery({
        queryKey: ["trendingContent", category],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/${category}/trending`);
            return data;
        },
        staleTime: 5 * 60 * 1000
    })
}
