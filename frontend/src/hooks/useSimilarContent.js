import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios';

export default function useSimilarContent(media, mediaId) {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ["similarContent", media, mediaId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/v1/${media}/${mediaId}/similar`);
            return data;
        }
    });
}
