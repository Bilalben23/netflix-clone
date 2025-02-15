import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function usePersonTvCredits(person_id) {
    const axiosInstance = useAxios();

    return useQuery({
        queryKey: ["personTvCredits", person_id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`api/v1/people/${person_id}`);
            return data;
        }
    })
}
