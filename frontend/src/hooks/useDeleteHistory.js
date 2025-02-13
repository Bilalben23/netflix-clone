import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAxios from './useAxios';
import { toast } from "react-hot-toast"


export default function useDeleteHistory() {
    const axiosInstance = useAxios();
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["deleteHistoryEntry"],
        mutationFn: async (entryId) => {
            const data = await axiosInstance.delete(`/api/v1/search/history/${entryId}`);
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["searchHistory"], exact: false });
            toast.success("Item removed successfully from search history.")
        },
        onError: () => {
            toast.error("Failed to remove item from search history.")
        }
    })
}
