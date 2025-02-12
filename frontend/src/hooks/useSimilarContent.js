import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios';

export default function useSimilarContent(media, mediaId) {
    const axiosInstance = useAxios();
    const validMedia = ["movie", "tv"];
    const finalMedia = validMedia.includes(media) ? media : "movie";

    return useQuery({
        queryKey: ["similarContent", finalMedia, mediaId],
        queryFn: async () => {
            if (!mediaId) {
                throw new Error("mediaId are required for fetching similar content.")
            }
            const { data } = await axiosInstance.get(`/api/v1/${finalMedia}/${mediaId}/similar`);
            return data;
        },
        enabled: !!mediaId
    });
}
