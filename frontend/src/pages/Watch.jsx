import { useParams } from 'react-router-dom';
import useTrailers from '../hooks/useTrailers';
import useSimilarContent from '../hooks/useSimilarContent';
import useContentDetails from '../hooks/useContentDetails';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from "swiper/modules";
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from "react-player";
import { useEffect, useRef } from 'react';
import { Img } from 'react-image';
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SwiperButton from '../components/ui/SwiperButton';
import SwiperCarousel from '../components/ui/SwiperCarousel ';
import ErrorMessage from '../components/ui/ErrorMessage';
import useQueryParams from '../hooks/useQueryParams';
import { format } from 'date-fns';


export default function Watch() {
    const { getParam } = useQueryParams();
    const media = getParam("media") || "movie";
    const { id } = useParams();
    const playersRef = useRef([]);
    const formattedMedia = media === "movie" ? "Movies" : "TV Shows";


    const handleSlideChange = (swiper) => {
        if (playersRef.current[swiper.previousIndex]?.getInternalPlayer) {
            playersRef.current[swiper.previousIndex]?.getInternalPlayer()?.pauseVideo();
        }
    };

    const {
        data: trailers,
        isLoading: isTrailersLoading,
        isError: isTrailersError,
        error: trailersError
    } = useTrailers(media, id);

    const {
        data: contentDetails,
        isLoading: isContentDetailsLoading,
        isError: isContentDetailsError,
        error: contentDetailsError
    } = useContentDetails(media, id);

    const {
        data: similarContent,
        isLoading: isSimilarContentLoading,
        isError: isSimilarContentError,
        error: similarContentError
    } = useSimilarContent(media, id);


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [id, media])


    return (
        <div className='mt-18 p-5 md:p-10 w-full md:w-[90%] mx-auto lg:w-[80%]'>

            {/* movie/tv trailers */}
            <div className='relative mb-5'>
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    grabCursor={trailers?.data?.length > 0}
                    spaceBetween={10}
                    rewind={trailers?.data?.length > 3}
                    scrollbar={{
                        hide: false,
                        draggable: true
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    navigation={{
                        prevEl: ".swiper-btn-prev-trailers",
                        nextEl: ".swiper-btn-next-trailers"
                    }}
                    speed={500}
                    onSlideChange={handleSlideChange}
                    className='size-full'
                >
                    {
                        isTrailersLoading
                            ? Array(10).fill(null).map((_, index) => {
                                return <SwiperSlide key={index}>
                                    <Skeleton className='aspect-video' />
                                </SwiperSlide>
                            })
                            : trailers?.data?.length !== 0
                                ? trailers?.data?.map((trailer, index) => {
                                    return <SwiperSlide key={trailer?.id} className='aspect-video'>
                                        <ReactPlayer
                                            ref={(el) => (playersRef.current[index] = el)}
                                            url={`https://www.youtube.com/watch?v=${trailer?.key}`}
                                            width="100%"
                                            height="100%"
                                            light
                                            controls
                                        />
                                    </SwiperSlide>
                                })
                                : <SwiperSlide>
                                    <div className="flex w-full bg-[#181818] aspect-video flex-col items-center justify-center p-10 text-center">
                                        <img src="/netflix-logo.png" alt="Netflix Logo" className="w-22 mb-4" />
                                        <p className="text-lg font-semibold text-gray-300">No trailers available for {formattedMedia} at the moment.</p>
                                        <p className="text-sm text-gray-400 mt-1">Check back later for updates.</p>
                                    </div>
                                </SwiperSlide>

                    }
                </Swiper>
                <SwiperButton
                    direction="prev"
                    category="trailers"
                    media={media}
                    iconsSize={35}
                />
                <SwiperButton
                    direction="next"
                    category="trailers"
                    media={media}
                    iconsSize={35}
                />
            </div>


            {/* Movie/tv details  */}
            <div className='flex flex-col md:flex-row items-center justify-between gap-x-20 gap-y-10 mt-10 md:mt-18 lg:mt-24'>
                <div className='md:flex-1 w-full'>
                    {
                        isContentDetailsLoading ?
                            <Skeleton className='h-[40px] md:h-[60px] lg:h-[80px]' width="90%" />
                            : <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-balance'>
                                {contentDetails?.data?.title || contentDetails?.data?.name}
                            </h1>

                    }
                    {
                        isContentDetailsLoading
                            ? <div className='flex items-center gap-x-1 mt-1' aria-hidden>
                                <Skeleton className='h-[25px] md:h-[30px] !w-[100px] md:!w-[130px]' />
                                <div className='text-[#181818] rounded text-2xl'>|</div>
                                <Skeleton className='h-[25px] md:h-[30px] !w-[70px] md:!w-[80px]' />
                            </div>
                            : <p className='mt-2 text-lg'>
                                {
                                    format(contentDetails?.data?.release_date || contentDetails?.data?.first_air_date, "MMM dd, yyyy")
                                } | {
                                    contentDetails?.data?.adult
                                        ? <span className='text-red-600'>18+</span>
                                        : <span className='text-green-600'>PG-13</span>
                                }
                            </p>
                    }

                    <p className='mt-4 text-lg'>
                        {
                            isContentDetailsLoading
                                ? <Skeleton count={7} />
                                : contentDetails?.data?.overview
                        }
                    </p>

                </div>
                <div className='md:flex-1 md:flex justify-end'>
                    <div className='aspect-[4/5] max-h-[400px] md:max-h-[500px]'>
                        <Img
                            src={`${ORIGINAL_IMG_BASE_URL}/${contentDetails?.data?.poster_path}`}
                            alt={`${contentDetails?.data?.title || contentDetails?.data?.name} poster`}
                            loader={<Skeleton className='size-full aspect-[4/5] h-[400px] md:h-[500px]' borderRadius={0} />}
                            className='size-full object-fit'
                            unloader={<img
                                src="/assets/poster_placeholder.png"
                                alt='fallback-img'
                                className='size-full object-fit'
                            />}
                        />
                    </div>
                </div>
            </div>


            {/* Similar content */}
            <div className='mt-20'>
                <h2 className='font-semibold mb-2 text-lg md:text-xl'>Similar {formattedMedia}</h2>
                {
                    !isSimilarContentError ?
                        similarContent?.data?.length !== 0
                            ? <div className='relative'>
                                <SwiperCarousel
                                    data={similarContent?.data}
                                    category="similarContent"
                                    media={media}
                                    isLoading={isSimilarContentLoading}
                                />
                                <SwiperButton
                                    direction="prev"
                                    category="similarContent"
                                    media={media}
                                />
                                <SwiperButton
                                    direction="next"
                                    category="similarContent"
                                    media={media}
                                />
                            </div>
                            : <div className="flex flex-col items-center justify-center p-8 text-center">
                                <img src="/assets/netflix-logo.png" alt="Netflix Logo" className="w-16 mb-4" />
                                <p className="text-lg font-semibold text-gray-300">No similar movies or TV shows available right now.</p>
                                <p className="text-sm text-gray-400 mt-1">Check back later for recommendations.</p>
                            </div>
                        : <ErrorMessage message={similarContentError?.message} />
                }
            </div>
        </div>
    )
}