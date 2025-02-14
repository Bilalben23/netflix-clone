import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from '../../utils/constants'
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
            slidesPerView={2}
            spaceBetween={20}
            slidesPerGroup={2}
            grabCursor
            freeMode={false}
            speed={500}
            rewind={data?.length > 3}
            pagination={{ clickable: true, type: 'fraction' }}
            navigation={{
                prevEl: `.swiper-btn-prev-${category}`,
                nextEl: `.swiper-btn-next-${category}`,
            }}
            resizeObserver
            observeSlideChildren
            breakpoints={{
                640: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 30,
                    pagination: { type: "bullets", clickable: true },
                    freeMode: true,
                    speed: 600
                },
                1024: {
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 20,
                    pagination: { type: "bullets", clickable: true },
                    freeMode: true,
                    speed: 700
                },
                1280: {
                    slidesPerView: 5,
                    slidesPerGroup: 5,
                    spaceBetween: 50,
                    pagination: { type: "bullets", clickable: true },
                    freeMode: true,
                    speed: 800
                }
            }}
        >
            {
                isLoading
                    ? Array.from({ length: 20 }).map((_, index) => (
                        <SwiperSlide key={index} className='bg-[#181818]/35 pb-2 rounded-md overflow-hidden'>
                            <Skeleton className='mb-1 h-[350px]' borderRadius={0} />
                            <Skeleton width="90%" className='ml-2' />
                        </SwiperSlide>
                    ))
                    : data?.map(item => {
                        const linkTo = media === "people" ? `/actor/${item?.id}` : `/watch/${item.id}?media=${media}`
                        const imagePath = media === "people" ? item?.profile_path : item?.poster_path;
                        let imgPlaceholder = ""
                        if (media === "people") {
                            console.log(item);
                            if (item?.gender === 1) {
                                imgPlaceholder = "female_img_placeholder.jpg"
                            } else if (item?.gender === 2) {
                                imgPlaceholder = "male_img_placeholder.webp"
                            } else {
                                imgPlaceholder = "male_img_placeholder.webp"
                            }
                        } else {
                            imgPlaceholder = "poster_placeholder.png"
                        }

                        return <SwiperSlide key={item.id} className='select-none bg-[#181818]/35 overflow-hidden border border-[#181818] shadow rounded-md pb-2' >
                            <Link to={linkTo} className='relative group block'>
                                <div className='overflow-hidden'>
                                    <Img
                                        src={`${SMALL_IMG_BASE_URL}${imagePath}`}
                                        alt={item.title || item.name}
                                        loader={<Skeleton className='h-[350px] mb-1' borderRadius={0} />}
                                        unloader={
                                            <img
                                                src={`/assets/${imgPlaceholder}`}
                                                alt="img-placeholder"
                                                className="transition-transform w-full h-[350px] duration-300 md:group-hover:scale-125"
                                            />
                                        }
                                        className="w-full max-h-[350px] object-cover transition-transform duration-300 md:group-hover:scale-105"
                                    />
                                </div>
                                <p className='mt-2 text-sm line-clamp-1 px-2 text-balance'>{item.title || item.name}</p>
                            </Link>
                        </SwiperSlide>
                    })}
        </Swiper>

    )
}
