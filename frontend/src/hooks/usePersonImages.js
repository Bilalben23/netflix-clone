import { useQuery } from '@tanstack/react-query'
import useAxios from './useAxios'

export default function usePersonImages(person_id) {
    const axiosInstance = useAxios();

    return useQuery({
        queryKey: ["personImages", person_id],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/api/v1/people/${person_id}/images`);
            return data;
        },
        enabled: !!person_id
    })
}
