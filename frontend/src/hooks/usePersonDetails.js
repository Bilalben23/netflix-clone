import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function usePersonDetails(person_id) {
    const axiosInstance = useAxios();

    return useQuery({
        queryKey: ["personDetails", person_id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/v1/people/${person_id}`);
            return data;
        },
        enabled: !!person_id
    })
}
