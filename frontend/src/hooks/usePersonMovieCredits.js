import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios';

export default function usePersonMovieCredits(person_id) {
    const axiosInstance = useAxios();

    return useQuery({
        queryKey: ["personMovieCredits", person_id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`api/v1/people/${person_id}/movie_credits`);
            return data;
        }
    })
}
