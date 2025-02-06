import React from 'react'
import AccountHomePage from './AccountHomePage';
import LandingPage from './LandingPage';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <>
            {
                isAuthenticated
                    ? <AccountHomePage />
                    : <LandingPage />
            }
        </>
    )
}
