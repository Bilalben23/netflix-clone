import { Info, Play, RefreshCcw } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import useTrendingContent from '../hooks/useTrendingContent';
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../utils/constants';


export default function HeroSection() {
    const [searchParam] = useSearchParams();
    const contentType = searchParam.get('media') || "movie";
    const { data, isLoading, isError, error } = useTrendingContent(contentType);


    if (isError) {
        return <div className='h-screen w-full flex items-center justify-center text-white'>
            <div className='flex-1 px-10'>
                <p className='font-semibold text-lg sm:text-xl md:text-2xl mb-3 text-red-500'>{error?.message || "Oops! Something went wrong."}</p>
                <p className='text-sm text-balance text-gray-200 mb-5'>We're having trouble loading the trending content right now. Try refreshing the page or check back later!
                </p>
                <button
                    type='button'
                    className='btn btn-primary px-4'
                    onClick={() => window.location.reload()}
                >
                    <RefreshCcw />
                    Retry
                </button>
            </div>
            <div className='flex-1 h-full relative'>
                <div className="bg-gradient-to-b from-black/60 via-black/30 to-black/10 absolute size-full inset-0 z-10" />
                <img src="../../assets/astronautFalling.jpg" alt="astronaut-falling" className='size-full' />
            </div>
        </div>
    }

    return (
        <div className='h-screen relative'>
            {
                data?.data?.backdrop_path ? <img
                    src={`${ORIGINAL_IMG_BASE_URL}/${data?.data?.backdrop_path}`}
                    alt="extraction-thumbnail"
                    className='-z-50 absolute inset-0 size-full object-cover'
                /> : <img src='../../assets/movieClipGif.gif' alt="movie-clip-gif" className='-z-50 absolute inset-0 size-full object-cover'
                />
            }
            <div className='absolute inset-0 size-full bg-black/50 -z-50' aria-hidden />

            <div className='absolute size-full inset-0 flex px-8 md:px-16 lg:px-32 justify-center flex-col'>
                <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute size-full inset-0 -z-10" />
                <div className='w-full md:w-1/2 mt-6'>
                    {
                        isLoading
                            ? <p className='skeleton bg-gray-500/50 w-42 h-7' aria-hidden />
                            : <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-balance font-extrabold line-clamp-2'>{data?.data?.title || data?.data?.name}</h1>
                    }

                    {
                        isLoading
                            ? <div className='flex items-center gap-x-1 mt-1' aria-hidden>
                                <p className='skeleton bg-gray-500/50 w-14 h-4' />
                                <span className='text-gray-500/50 rounded'>|</span>
                                <p className='skeleton bg-gray-500/50 w-10 h-4' />
                            </div>
                            : <p className='md:text-lg'>
                                {data?.data?.release_date?.split("-")[0] || data?.data?.first_air_date?.split("-")[0]} | {data?.data?.adult ? "18+" : "PG-13"}</p>
                    }

                    {
                        isLoading
                            ? <div className='mt-4 flex flex-col gap-y-2' aria-hidden>
                                <p className='w-full h-4 skeleton bg-gray-500/50'></p>
                                <p className='w-[90%] h-4 skeleton  bg-gray-500/50 '></p>
                                <p className='w-[95%] h-4 skeleton  bg-gray-500/50 '></p>
                                <p className='w-3/4 h-4 skeleton  bg-gray-500/50 '></p>
                                <p className='w-1/2 h-4 skeleton  bg-gray-500/50 '></p>
                            </div>
                            : <p className='mt-4 text-sm text-gray-200 line-clamp-5'>
                                {data?.data?.overview}
                            </p>
                    }

                    {
                        isLoading
                            ? <div className='flex mt-8 gap-x-4' aria-hidden>
                                <div className='w-22 h-9 skeleton bg-gray-500/50' />
                                <div className='w-26 h-9 skeleton bg-gray-500/50' />
                            </div>
                            : <div className='flex mt-8 gap-x-4'>
                                <Link to={`/watch/${data?.data?.id}`} className='btn  text-black transition bg-white hover:opacity-90'>
                                    <Play className='size-6 inline-block fill-black' />
                                    <span>Play</span>
                                </Link>
                                <Link to={`/watch/${data?.data?.id}`} className='btn bg-gray-500/50 hover:bg-gray-500/60 transition'>
                                    <Info className='size-6' />
                                    <span>More info</span>
                                </Link>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}
