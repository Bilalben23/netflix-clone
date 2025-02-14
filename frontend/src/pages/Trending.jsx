import React, { useEffect } from 'react'
import useTrending from '../hooks/useTrending'
import SwiperCarousel from '../components/ui/SwiperCarousel ';
import SwiperButton from '../components/ui/SwiperButton';

export default function Trending() {
    const { data: movies, isLoading: isMoviesLoading } = useTrending("movies");
    const { data: tvs, isLoading: isTvsLoading } = useTrending("tvs");
    const { data: people, isLoading: isPeopleLoading } = useTrending("people");



    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <section className='mt-20 mx-auto w-[90%] flex flex-col gap-y-8'>

            <div>
                <h1 className='capitalize font-semibold mb-2'>Trending Movies</h1>
                <div className='relative'>
                    <SwiperCarousel
                        data={movies?.data}
                        category="trendingMovies"
                        media="movie"
                        isLoading={isMoviesLoading} />
                    <SwiperButton direction="prev" category="trendingMovies" media="movie" />
                    <SwiperButton direction="next" category="trendingMovies" media="movie" />
                </div>
            </div>

            <div>
                <h1 className='capitalize font-semibold mb-2'>Trending TV Shows</h1>
                <div className='relative'>
                    <SwiperCarousel
                        data={tvs?.data}
                        category="trendingTvs"
                        media="tv"
                        isLoading={isTvsLoading} />
                    <SwiperButton direction="prev" category="trendingTvs" media="tv" />
                    <SwiperButton direction="next" category="trendingTvs" media="tv" />
                </div>
            </div>

            <div>
                <h1 className='capitalize font-semibold mb-2'>Trending People</h1>
                <div className='relative'>
                    <SwiperCarousel
                        data={people?.data}
                        category="trendingPeople"
                        media="people"
                        isLoading={isPeopleLoading} />
                    <SwiperButton direction="prev" category="trendingPeople" media="people" />
                    <SwiperButton direction="next" category="trendingPeople" media="people" />
                </div>
            </div>

        </section >
    )
}
