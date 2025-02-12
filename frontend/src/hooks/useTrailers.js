import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function useTrailers(media, mediaId) {
    const axiosInstance = useAxios();
    const validMedia = ["movie", "tv"];
    const finalMedia = validMedia.includes(media) ? media : "movie";

    return useQuery({
        queryKey: ["trailers", finalMedia, mediaId],
        queryFn: async () => {
            if (!mediaId) {
                throw new Error("MediaId is required to fetch trailers.")
            }
            const { data } = await axiosInstance.get(`/api/v1/${finalMedia}/${mediaId}/trailers`);
            return data;
        },
        enabled: !!mediaId
    })
}
