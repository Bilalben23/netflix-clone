import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';

export default function useTrending(searchType) {
    const axiosInstance = useAxios();

    return useQuery({
        queryKey: ["trendingContent", searchType],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/v1/trending/${searchType}`);
            return data;
        }
    })
}

