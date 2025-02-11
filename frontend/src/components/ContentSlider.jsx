import { useSearchParams } from 'react-router-dom';
import useContentByCategory from '../hooks/useContentByCategory ';
import SwiperButton from './ui/SwiperButton';
import SwiperCarousel from './ui/SwiperCarousel ';
import ErrorMessage from './ui/ErrorMessage ';


export default function ContentSlider({ category }) {
    const [searchParam] = useSearchParams();
    const media = searchParam.get("media") || "movie";
    const formattedMedia = media === "movie" ? "Movies" : "TV Shows";
    const formattedCategoryName = category.replaceAll("_", " ");

    const { data, isLoading, error, isError } = useContentByCategory(media, category);

    return (
        <div className='bg-black text-white  w-[90%] mx-auto'>
            <p className='capitalize font-semibold mb-2'>
                {formattedCategoryName} {formattedMedia}
            </p>
            {
                !isError ?
                    <div className='relative'>
                        <SwiperCarousel
                            data={data?.data}
                            category={category}
                            media={media}
                            isLoading={isLoading}
                        />
                        <SwiperButton
                            direction="prev"
                            category={category}
                            media={media}
                        />
                        <SwiperButton
                            direction="next"
                            category={category}
                            media={media}
                        />
                    </div>
                    : <ErrorMessage message={error} />
            }
        </div>
    )
}


// npm i tailwind-scrollbar-hide