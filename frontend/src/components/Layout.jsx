import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthHeader from './headers/AuthHeader ';
import { useSelector } from 'react-redux';
import PublicHeader from './headers/PublicHeader ';
import HeroSection from "../components/landing/HeroSection";

export default function Layout() {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <>
            {
                isAuthenticated ? <AuthHeader /> : <div className='hero-bg'>
                    <PublicHeader />
                    <HeroSection />
                </div>

            }
            <main>
                <Outlet />
            </main>
        </>
    )
}
