import HeroSection from '../../components/HeroSection'
import CategoryContentSection from '../../components/CategoryContentSection ';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function AccountHomePage() {
    const [searchParam] = useSearchParams();
    const media = searchParam.get('media') || "movie";

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [media])

    return (
        <>
            <HeroSection media={media} />
            <CategoryContentSection media={media} />
        </>
    )
}
