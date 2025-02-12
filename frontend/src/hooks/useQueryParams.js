import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {

    const [searchParams, setSearchParams] = useSearchParams();

    // Get a specific query param
    const getParam = (key) => searchParams.get(key)


    // set or update a query param
    const setParam = (key, value) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams, { replace: true })
    }

    // remove a query param
    const removeParam = (key) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete(key);
        setSearchParams(newParams, { replace: true })
    }


    return { getParam, setParam, removeParam, searchParams }
}
