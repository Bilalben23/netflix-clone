import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function useTrendingContent(media) {
    const axiosInstance = useAxios();
    const validMedia = ["movie", "tv"];
    const finalMedia = validMedia.includes(media) ? media : "movie";

    return useQuery({
        queryKey: ["trendingContent", finalMedia],
        queryFn: async () => {

            const { data } = await axiosInstance.get(`/api/v1/${finalMedia}/trending`);
            return data;
        }
    })
}
