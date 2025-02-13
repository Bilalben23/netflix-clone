import { Outlet } from 'react-router-dom';
import AuthHeader from './headers/AuthHeader ';
import { useSelector } from 'react-redux';
import PublicHeader from './headers/PublicHeader ';
import LandingHeroSection from "./landing/landingHeroSection";
import Footer from './Footer';

export default function Layout() {
    const { isAuthenticated } = useSelector(state => state.auth);

    return (
        <>
            {
                isAuthenticated
                    ? <AuthHeader />
                    : <div className='hero-bg'>
                        <PublicHeader />
                        <LandingHeroSection />
                    </div>
            }
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
