import { SMALL_IMG_BASE_URL } from '../../utils/constants'
import { SwiperSlide, Swiper } from 'swiper/react'
import Skeleton from 'react-loading-skeleton'
import { FreeMode, Navigation, Pagination } from 'swiper/modules'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Img } from 'react-image';
import { Link } from 'react-router-dom';


export default function SwiperCarousel({ data, category, media, isLoading }) {


    return (
        <Swiper
            modules={[Navigation, Pagination, FreeMode]}
            slidesPerView={1}
            spaceBetween={10}
            slidesPerGroup={1}
            freeMode={false}
            grabCursor
            speed={500}
            rewind={data?.length > 3}
            pagination={{ clickable: true, type: 'fraction' }}
            navigation={{
                prevEl: `.swiper-btn-prev-${category}`,
                nextEl: `.swiper-btn-next-${category}`,
            }}
            resizeObserver
            observeParents
            observeSlideChildren
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                    slidesPerGroup: 2,
                    pagination: { type: "bullets", clickable: true },
                    freeMode: true,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    slidesPerGroup: 3,
                    pagination: { type: "bullets", clickable: true },
                    freeMode: true,
                },
                1280: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                    slidesPerGroup: 4,
                    pagination: { type: "bullets", clickable: true },
                    freeMode: true,
                }
            }}
        >
            {isLoading
                ? Array(20).fill(null).map((_, index) => (
                    <SwiperSlide key={index}>
                        <Skeleton className='mb-1 aspect-video' borderRadius={0} />
                        <Skeleton width="90%" className='ml-2' />
                    </SwiperSlide>
                ))
                : data?.map(item => (
                    <SwiperSlide key={item.id} className='select-none'>
                        <Link to={`/watch/${item.id}?media=${media}`} className='relative group block'>
                            <div className='overflow-hidden'>
                                <Img
                                    src={`${SMALL_IMG_BASE_URL}/${item.backdrop_path}`}
                                    alt={item.title || item.name}
                                    loader={<Skeleton className='aspect-video mb-1' borderRadius={0} />}
                                    unloader={
                                        <img
                                            src="../../assets/img_placeholder.jpg"
                                            alt="img-placeholder"
                                            className="aspect-video transition-transform duration-300 md:group-hover:scale-125"
                                        />
                                    }
                                    className="aspect-video object-cover w-full transition-transform duration-300 md:group-hover:scale-125"
                                />
                            </div>
                            <p className='mt-2 text-sm line-clamp-2 px-2 text-balance'>{item.title || item.name}</p>
                        </Link>
                    </SwiperSlide>
                ))}
        </Swiper>

    )
}
