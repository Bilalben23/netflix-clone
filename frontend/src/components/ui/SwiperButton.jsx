import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SwiperButton({ direction, category, media, extraClass = "", iconsSize = 30 }) {
    const isPrev = direction === 'prev';
    const btnClass = `
            p-1 hover:opacity-90 shadow cursor-pointer rounded-full bg-white text-black transition absolute top-1/2 z-2 -translate-y-1/2
            ${isPrev ? "left-2" : "right-2"}
            ${isPrev ? "swiper-btn-prev-" : "swiper-btn-next-"}${category}
            ${extraClass}
            `
    return <button
        type="button"
        aria-label={`${isPrev ? "Previous" : "Next"} Similar ${media}`}
        className={btnClass}
    >
        {
            isPrev
                ? <ChevronLeft size={iconsSize} />
                : <ChevronRight size={iconsSize} />
        }
    </button>

}
