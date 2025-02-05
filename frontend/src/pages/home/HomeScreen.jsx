import React from 'react'
import AccountHomePage from './AccountHomePage';
import LandingPage from './LandingPage';

export default function HomeScreen() {
    const isAuthenticated = false;
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
