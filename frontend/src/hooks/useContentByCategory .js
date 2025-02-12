import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function useContentByCategory(media, category) {
    const axiosInstance = useAxios();

    const validMedia = ["movie", "tv"];
    const finalMedia = validMedia.includes(media) ? media : "movie";


    return useQuery({
        queryKey: ["content-category", finalMedia, category],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/v1/${finalMedia}/category/${category}`);
            return data;
        }
    })
}
