import HeroSection from '../../components/HeroSection'
import CategoryContentSection from '../../components/CategoryContentSection ';
import { useEffect } from 'react';

export default function AccountHomePage() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <HeroSection />
            <CategoryContentSection />
        </>
    )
}
