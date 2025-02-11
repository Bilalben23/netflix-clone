import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios';

export default function useContentDetails(media, mediaId) {
    const axiosInstance = useAxios();
    return useQuery({
        queryKey: ["contentDetails", media, mediaId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/v1/${media}/${mediaId}/details`);
            return data;
        }
    })
}
