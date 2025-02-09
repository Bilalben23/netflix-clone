import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function useContentByCategory(media, category) {
    const axiosInstance = useAxios();

    const validMedia = ["movie", "tv"];
    if (!validMedia.includes(media)) {
        media = "movie";
    }

    return useQuery({
        queryKey: ["content-category", media, category],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/${media}/category/${category}`);
            return data;
        }
    })
}
