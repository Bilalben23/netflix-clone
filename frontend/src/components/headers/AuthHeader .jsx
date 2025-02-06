import React from 'react'
import useLogout from '../../hooks/useLogout';

export default function AuthHeader() {

    const logout = useLogout();
    const signOut = async () => {
        await logout();
    }

    return (
        <header className='navbar justify-between '>
            <p>The header goes here...</p>
            <button type="button" onClick={signOut} className='btn'>Logout</button>
        </header>
    )
}
