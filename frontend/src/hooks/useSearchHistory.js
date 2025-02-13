import { keepPreviousData, useQuery } from '@tanstack/react-query'
import useAxios from './useAxios';

export default function useSearchHistory(page) {
    const axiosInstance = useAxios();

    return useQuery({
        queryKey: ["searchHistory", page],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/v1/search/history?page=${page}`);
            return data;
        },
        placeholderData: keepPreviousData
    })
}
