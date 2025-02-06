import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useRefreshToken from '../hooks/useRefreshToken';
import { Outlet } from "react-router-dom";
import { MoonLoader } from "react-spinners";

export default function PersistLogin() {
    const [loading, setLoading] = useState(true);
    const { accessToken } = useSelector(state => state.auth);
    const refresh = useRefreshToken();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        !accessToken ? verifyRefreshToken() : setLoading(false);

    }, [])

    return (
        <>
            {
                loading ?
                    <div className='h-screen flex items-center justify-center'>
                        <MoonLoader size={30} color='white' />
                    </div>
                    : <Outlet />
            }
        </>
    )
}
