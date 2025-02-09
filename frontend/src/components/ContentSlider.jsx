import { Link, useSearchParams } from 'react-router-dom';
import useContentByCategory from '../hooks/useContentByCategory ';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Autoplay, Navigation, Pagination, FreeMode, Scrollbar } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css/free-mode";
import 'swiper/css/scrollbar';


export default function ContentSlider({ category }) {
    const [searchParam] = useSearchParams();
    const media = searchParam.get("media") || "movie";
    const formattedMedia = media === "movie" ? "Movies" : "TV Shows";
    const formattedCategoryName = category.replaceAll("_", " ");

    const { data, isLoading, error, isError } = useContentByCategory(media, category);

    return (
        <div className='bg-black text-white relative w-[90%] mx-auto'>
            <p className='capitalize font-semibold mb-2'>
                {formattedCategoryName} {formattedMedia}
            </p>

            <Swiper
                modules={[Autoplay, Navigation, Pagination, FreeMode, Scrollbar]}
                slidesPerView={1}
                spaceBetween={10}
                slidesPerGroup={1}
                freeMode
                scrollbar={{
                    enabled: true
                }}
                grabCursor
                // pagination={{
                //     type: "fraction",
                //     clickable: isLoading
                // }}
                speed={500}
                rewind
                navigation={{
                    prevEl: `.swiper-btn-prev-${category}`,
                    nextEl: `.swiper-btn-next-${category}`,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                        slidesPerGroup: 2,
                        pagination: {
                            type: "bullets"
                        }
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                        slidesPerGroup: 3,
                        pagination: {
                            type: "bullets"
                        }
                    }
                }}
            >
                {
                    isLoading
                        ? Array(20).fill(null).map((_, index) => {
                            return <SwiperSlide key={index} className='cursor-wait'>
                                <div className='skeleton bg-gray-500/50  h-[300px] md:h-[210px]'></div>
                                <p className='skeleton bg-gray-500/50 w-[90%] mt-2 h-4' />
                            </SwiperSlide>
                        })
                        : data?.data?.map(item => (
                            <SwiperSlide key={item.id} className='select-none'>
                                <Link to={`/watch/${item.id}`} className='relative group block'>
                                    <div className='overflow-hidden'>
                                        <img
                                            src={`${SMALL_IMG_BASE_URL}/${item.backdrop_path}`}
                                            alt={item.title || item.name}
                                            className="size-full object-cover transition-transform duration-300 md:group-hover:scale-125"
                                            loading='lazy'
                                        />
                                    </div>
                                    <p className='mt-2 text-sm line-clamp-2 px-2 text-balance tec'>{item.title || item.name}</p>
                                </Link>
                            </SwiperSlide>
                        ))
                }
            </Swiper>
            <button type="button" className={`p-1 hover:opacity-90 shadow cursor-pointer left-1 !rounded-full bg-black/50 transition absolute top-1/2 z-2 -translate-y-1/2 swiper-btn-prev-${category}`}>
                <ChevronLeft size={30} />
            </button>
            <button type="button" className={`p-1 hover:opacity-90 shadow cursor-pointer right-1 rounded-full bg-black/50 transition absolute top-1/2 z-2 -translate-y-1/2 swiper-btn-next-${category}`} >
                <ChevronRight size={30} />
            </button>
        </div >
    )
}


// npm i tailwind-scrollbar-hide