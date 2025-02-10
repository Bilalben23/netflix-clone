import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function useTrailers(media) {
    return useQuery({
        queryKey: [""],
        queryFn: async () => {

        }
    })
}
