import HeroSection from '../../components/HeroSection'
import CategoryContentSection from '../../components/CategoryContentSection';
import { useEffect } from 'react';
import useQueryParams from '../../hooks/useQueryParams';


export default function AccountHomePage() {
    const { getParam } = useQueryParams();
    const media = getParam('media') || "movie";


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
