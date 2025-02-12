import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios'

export default function useSearch(mediaType = "movie", searchTerm = "") {
    const axiosInstance = useAxios();
    const validMedia = ["movie", "person", "tv"];
    const finalMedia = validMedia.includes(mediaType) ? mediaType : "movie";

    return useQuery({
        queryKey: ["search", finalMedia, searchTerm],
        queryFn: async () => {
            console.log("I will only logged when the search term is specified")
            const { data } = await axiosInstance.get(`/api/v1/search/${finalMedia}/${searchTerm}`);
            return data;
        },
        enabled: !!searchTerm // only fetch when search is not empty
    })

}
