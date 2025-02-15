import { useParams } from 'react-router-dom'
import usePersonDetails from '../hooks/usePersonDetails';
import usePersonImages from '../hooks/usePersonImages';
import usePersonMovieCredits from "../hooks/usePersonMovieCredits";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCards } from "swiper/modules";
import { Img } from 'react-image';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import Skeleton from 'react-loading-skeleton';


import "swiper/css";
import "swiper/css/effect-cards";
import usePersonTvCredits from '../hooks/usePersonTvCredits';
import SwiperCarousel from '../components/ui/SwiperCarousel ';
import SwiperButton from '../components/ui/SwiperButton';
import { useEffect } from 'react';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function Person() {
    const { id } = useParams();


    const {
        data: personDetails,
        isLoading: isPersonDetailsLoading,
        error: isPersonDetailsError,
        isError: personDetailsError
    } = usePersonDetails(id);

    const {
        data: personImages,
        isLoading: isPersonImagesLoading,
        error: personImagesError,
        isError: isPersonImagesError
    } = usePersonImages(id);

    const {
        data: personMovieCredits,
        isLoading: isPersonMovieCreditsLoading,
        isError: isPersonMovieCreditsError,
        error: personMovieCreditsError
    } = usePersonMovieCredits(id);
    const {
        data: personTVCredits,
        isLoading: isPersonTVCreditsLoading,
        isError: isPersonTVCreditsError,
        error: personTVCreditsError
    } = usePersonTvCredits(id);


    const castMovies = personMovieCredits?.data?.cast || [];
    const crewMovies = personMovieCredits?.data?.crew || [];

    const castTV = personTVCredits?.data?.cast || [];
    const crewTV = personTVCredits?.data?.crew || [];


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id])


    return (
        <section className='mt-20 w-[90%] mx-auto p-5'>

            <section className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 items-center'>
                {
                    !isPersonDetailsError ?
                        <div className="p-6">
                            {/* Person's Name */}
                            <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                                {
                                    isPersonDetailsLoading
                                        ? <Skeleton height={40} width="50%" />
                                        : personDetails?.data?.name
                                }
                            </h1>

                            {/* Also Known As (if available) */}
                            {
                                isPersonDetailsLoading
                                    ? <div className='mb-4'>
                                        <Skeleton count={3} width="100%" />
                                        <Skeleton width="30%" />
                                    </div>
                                    : personDetails?.data?.also_known_as?.length > 0 && (
                                        <p className="text-center text-sm text-gray-400 italic mb-4">
                                            Also known as: {personDetails.data.also_known_as.join(", ")}
                                        </p>
                                    )
                            }

                            {/* Birthdate & Place of Birth */}
                            <div className="flex flex-col gap-y-2 text-gray-300 text-sm mb-4">
                                <p>
                                    {
                                        isPersonDetailsLoading
                                            ? <Skeleton width="50%" />
                                            : <>
                                                <span className="font-semibold">Born:</span> {
                                                    personDetails?.data?.birthday || "N/A"}
                                            </>
                                    }
                                </p>
                                <p>
                                    {
                                        isPersonDetailsLoading
                                            ? <Skeleton width="100%" />
                                            : <>
                                                <span className="font-semibold">Place of Birth:</span> {
                                                    personDetails?.data?.place_of_birth || "Unknown"}
                                            </>
                                    }
                                </p>
                            </div>

                            {/* Biography */}
                            <div className='max-h-[400px] overflow-y-auto pr-2'>
                                {
                                    isPersonDetailsLoading ?
                                        <>
                                            <Skeleton count={8} height={18} />
                                            <Skeleton width="70%" height={18} />
                                        </>
                                        : personDetails?.data?.biography ? (
                                            <p className="text-gray-300 leading-relaxed text-sm">
                                                {personDetails.data.biography}
                                            </p>
                                        ) : (
                                            <p className="text-gray-400 italic">No biography available.</p>
                                        )
                                }
                            </div>

                            {/* Homepage Link */}
                            {personDetails?.data?.homepage && (
                                <div className="mt-4 text-center">
                                    <a
                                        href={personDetails.data.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-400 hover:underline"
                                    >
                                        Official Website
                                    </a>
                                </div>
                            )}
                        </div>
                        : <ErrorMessage message={personDetailsError?.message} />
                }


                {/* images */}
                {
                    !isPersonImagesError
                        ? <div className='overflow-hidden'>
                            <Swiper
                                modules={[EffectCards, Autoplay]}
                                effect='cards'
                                cardsEffect={{
                                    perSlideOffset: 2,
                                    slideShadows: true,
                                    perSlideRotate: 4,

                                }}
                                grabCursor
                                slidesPerView={1}
                                autoplay={{
                                    delay: 1000,
                                    waitForTransition: true,
                                    pauseOnMouseEnter: true
                                }}
                                speed={800}
                                className='scale-75'
                                updateOnWindowResize
                            >

                                {
                                    isPersonImagesLoading
                                        ? Array.from({ length: 4 }).map((_, index) => {
                                            return <SwiperSlide key={index}>
                                                <Skeleton height={600} width="100%" />
                                            </SwiperSlide>
                                        })
                                        : personImages?.data?.length > 0
                                            ? personImages?.data?.map((item, index) => {
                                                return <SwiperSlide key={index}>
                                                    <Img
                                                        src={`${SMALL_IMG_BASE_URL}${item?.file_path}`}
                                                        className='size-[600px]'
                                                        loader={<Skeleton
                                                            height={600}
                                                            width={600}
                                                        />}
                                                        unloader={
                                                            <img
                                                                src='/assets/img_placeholder.jpg'
                                                                className='size-[600px]'
                                                                alt='img-placeholder'
                                                            />
                                                        }
                                                    />
                                                </SwiperSlide>
                                            })
                                            : <SwiperSlide>
                                                <p>No images to show</p>
                                            </SwiperSlide>
                                }
                            </Swiper>
                        </div>
                        : <ErrorMessage message={personImagesError?.message} />
                }
            </section>

            <section className='mt-16 flex flex-col gap-y-5'>
                {/* movie credits */}
                {
                    !isPersonMovieCreditsError
                        ? <>
                            {
                                castMovies.length > 0 && <div>
                                    <p className="text-xl font-semibold mb-4">🎭 Movies (Cast)</p>
                                    <div className='relative'>
                                        <SwiperCarousel
                                            data={castMovies}
                                            isLoading={isPersonMovieCreditsLoading}
                                            category="moviesCast"
                                            media="movie"
                                        />
                                        <SwiperButton
                                            direction="prev"
                                            category="moviesCast"
                                            media="movie"
                                        />
                                        <SwiperButton
                                            direction="next"
                                            category="moviesCast"
                                            media="movie"
                                        />
                                    </div>
                                </div>
                            }
                            {
                                crewMovies.length > 0 && <div>
                                    <h2 className="text-xl font-semibold mt-8 mb-4">🎬 Movies (Crew)</h2>
                                    <div className='relative'>
                                        <SwiperCarousel
                                            data={crewMovies}
                                            isLoading={isPersonMovieCreditsLoading}
                                            category="moviesCrew"
                                            media="movie"
                                        />
                                        <SwiperButton
                                            direction="prev"
                                            category="moviesCrew"
                                            media="movie"
                                        />
                                        <SwiperButton
                                            direction="next"
                                            category="moviesCrew"
                                            media="movie"
                                        />
                                    </div>
                                </div>
                            }
                        </>
                        : <ErrorMessage message={personMovieCreditsError?.message} />
                }

                {/* TV credits */}
                {
                    !isPersonTVCreditsError
                        ? <>
                            {
                                castTV.length > 0 && <div>
                                    <h2 className="text-xl font-semibold mt-8 mb-4">📺 TV Shows (Cast)</h2>
                                    <div className='relative'>
                                        <SwiperCarousel
                                            data={castTV}
                                            isLoading={isPersonTVCreditsLoading}
                                            category="castTV"
                                            media="tv"
                                        />
                                        <SwiperButton
                                            direction="prev"
                                            category="castTV"
                                            media="tv"
                                        />
                                        <SwiperButton
                                            direction="next"
                                            category="castTV"
                                            media="tv"
                                        />
                                    </div>
                                </div>
                            }
                            {
                                crewTV.length > 0 && <div>
                                    <h2 className="text-xl font-semibold mt-8 mb-4">🎥 TV Shows (Crew)</h2>
                                    <div className='relative'>
                                        <SwiperCarousel
                                            data={crewTV}
                                            isLoading={isPersonTVCreditsLoading}
                                            category="crewTV"
                                            media="tv"
                                        />
                                        <SwiperButton
                                            direction="prev"
                                            category="crewTV"
                                            media="tv"
                                        />
                                        <SwiperButton
                                            direction="next"
                                            category="crewTV"
                                            media="tv"
                                        />
                                    </div>
                                </div>
                            }
                        </>
                        : <ErrorMessage message={personTVCreditsError?.message} />
                }
            </section>

        </section>
    )
}
