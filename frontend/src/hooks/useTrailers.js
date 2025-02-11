import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function useTrailers(media, mediaId) {
    const axiosInstance = useAxios();
    const validMedia = ["movie", "tv"];
    if (!validMedia.includes(media)) {
        media = "movie";
    }
    return useQuery({
        queryKey: ["trailers", media, mediaId],
        queryFn: async () => {
            console.log(media, mediaId)
            const { data } = await axiosInstance.get(`/api/v1/${media}/${mediaId}/trailers`);
            return data;
        }
    })
}
