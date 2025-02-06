import React from 'react'
import { useSelector } from 'react-redux'
import AccountHomePage from './AccountHomePage';
import LandingPage from './LandingPage';

export default function HomeScreen() {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <>
            {
                isAuthenticated ? <AccountHomePage /> : <LandingPage />
            }
        </>
    )
}
