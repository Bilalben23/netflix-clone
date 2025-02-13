import { useIsFetching } from '@tanstack/react-query'
import { ClipLoader } from "react-spinners"

export default function GlobalLoader() {
    const isFetching = useIsFetching();

    return (
        <div className={`absolute transition-opacity duration-300 z-20 top-18 right-2 ${isFetching ? "opacity-100" : "opacity-0"}`
        } >
            <ClipLoader color='white' />
        </div >
    )
}
