import { useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import useAxios from './useAxios'


export default function useSearch(mediaType = "movie", searchTerm = "") {
    const queryClient = useQueryClient();
    const axiosInstance = useAxios();
    const validMedia = ["movie", "person", "tv"];
    const finalMedia = validMedia.includes(mediaType) ? mediaType : "movie";

    return useQuery({
        queryKey: ["search", finalMedia, searchTerm],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/v1/search/${finalMedia}?query=${searchTerm}`);
            if (data.success) {
                queryClient.invalidateQueries({ queryKey: ["searchHistory"], exact: false })
            }
            return data;
        },

        enabled: !!searchTerm // only fetch when search is not empty
    })

}
