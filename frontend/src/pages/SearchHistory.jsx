import useSearchHistory from '../hooks/useSearchHistory'
import Skeleton from 'react-loading-skeleton';
import useQueryParams from '../hooks/useQueryParams';
import { Img } from 'react-image';
import { SMALL_IMG_BASE_URL } from '../utils/constants';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Eye, Trash, History } from 'lucide-react';
import useDeleteHistory from '../hooks/useDeleteHistory';
import ErrorMessage from "../components/ui/ErrorMessage";
import { useEffect } from 'react';
import { formatDistanceToNow } from "date-fns";


export default function SearchHistory() {
    const { getParam, setParam } = useQueryParams();
    const page = parseInt(getParam("page")) || 1;
    const { data, isPending, isError, error } = useSearchHistory(page);
    const { mutate: deleteHistoryEntry } = useDeleteHistory();
    const date = new Date();


    const handlePerviousPageBtn = () => {
        setParam("page", page - 1)
    }
    const handleNextPageBtn = () => {
        setParam("page", page + 1)
    }

    const handleDeleteHistoryBtn = (entryId) => {
        deleteHistoryEntry(entryId);
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [page])


    return (
        <div className='min-h-screen pt-18 mb-22'>

            {
                !isError
                    ? <div className='p-10 flex flex-col gap-y-6'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5 md:gap-y-10'>
                            {
                                isPending
                                    ? Array.from({ length: 12 }).map((_, index) => (
                                        <div key={index} className='bg-[#181818]/35 p-4 rounded shadow-md flex flex-col gap-y-3'>
                                            <div className='flex gap-x-5 shrink-0'>
                                                <div>
                                                    <Skeleton className='!size-14' circle />
                                                </div>
                                                <div className='w-full flex-1 flex flex-col gap-y-3 '>
                                                    <Skeleton width="100%" height={30} />
                                                    <Skeleton width="50%" height={20} />
                                                </div>
                                                <div>
                                                    <Skeleton width={60} height={25} borderRadius={20} />
                                                </div>
                                            </div>
                                            <div className='self-end flex items-center gap-x-3'>
                                                <Skeleton height={35} width={35} circle />
                                                <Skeleton height={35} width={35} circle />
                                            </div>
                                        </div>
                                    ))
                                    : data?.data?.length !== 0
                                        ? data?.data?.map(entry => {
                                            const isPerson = entry.searchType === "person";
                                            const linkTo = isPerson
                                                ? `/person/${entry?.reference_id}`
                                                : `/watch/${entry?.reference_id}`;
                                            const imgPlaceholder = isPerson ? "small_user_img.avif" : "small_img_placeholder.jpg"

                                            return <div key={entry?._id} className='bg-[#181818]/35 p-4 flex flex-col justify-between gap-y-1 rounded shadow-md'>
                                                <div className='flex gap-x-5'>
                                                    <div className='size-14 flex-none'>
                                                        <Img
                                                            src={`${SMALL_IMG_BASE_URL}/${entry?.image}`}
                                                            alt={entry?.title}
                                                            className='size-full object-cover rounded-full'
                                                            loader={<Skeleton className='!size-full' circle />}
                                                            unloader={<img
                                                                src={`/assets/${imgPlaceholder}`}
                                                                className='size-full object-cover rounded-full'

                                                            />}
                                                        />
                                                    </div>
                                                    <div className='flex flex-col gap-y-1'>
                                                        <span className='text-white  text-balance line-clamp-2'>{entry?.title}</span>
                                                        <span className='text-gray-400 text-xs'>{formatDistanceToNow(entry?.createdAt, { addSuffix: true })}</span>
                                                    </div>
                                                    <div className='flex-1 flex flex-col justify-between items-end'>
                                                        <p className={`badge capitalize shadow badge-sm rounded-full ${entry.searchType === "movie" ? "badge-error"
                                                            : entry.searchType === "tv"
                                                                ? "badge-primary"
                                                                : "badge-success"
                                                            }`}>{entry?.searchType}</p>
                                                    </div>
                                                </div>
                                                <div className='self-end flex items-center gap-x-3'>
                                                    <Link to={linkTo} type='button' className='btn btn-circle btn-sm' aria-label='view a history'>
                                                        <Eye />
                                                    </Link>
                                                    <button
                                                        type='button'
                                                        className='btn btn-circle btn-sm'
                                                        aria-label='delete a history'
                                                        onClick={() => handleDeleteHistoryBtn(entry?._id)}>
                                                        <Trash className='text-red-400' />
                                                    </button>
                                                </div>
                                            </div>
                                        })
                                        : <div className='col-span-full flex flex-col items-center justify-center p-10 bg-[#181818]/40 rounded-lg shadow-md'>
                                            <History size={40} />
                                            <p className='text-gray-300 text-lg mt-4 font-semibold'>No search history found</p>
                                            <p className='text-gray-500 text-sm'>Start searching to see your history here.</p>
                                            <Link to="/search" className='btn mt-4'>Search</Link>
                                        </div>
                            }
                        </div>

                        {/* Pagination */}
                        {
                            data?.pagination?.totalPages > 1 && <div className='join self-end'>
                                <button
                                    type="button"
                                    className='btn join-item'
                                    disabled={data?.pagination?.currentPage === 1}
                                    onClick={handlePerviousPageBtn}>
                                    <ChevronLeft />
                                </button>
                                {
                                    Array.from({ length: data?.pagination?.totalPages || 1 }, (_, index) => index + 1).map(index => (
                                        <button
                                            key={index}
                                            type="button"
                                            className='btn join-item'
                                            onClick={() => setParam("page", index)}
                                            disabled={data?.pagination?.currentPage === index}
                                        >
                                            {index}
                                        </button>
                                    ))
                                }
                                <button
                                    type="button"
                                    className='btn join-item'
                                    disabled={!data?.pagination?.hasMore}
                                    onClick={handleNextPageBtn}>
                                    <ChevronRight />
                                </button>
                            </div>
                        }
                    </div>
                    : <ErrorMessage message={error?.message} />
            }
        </div >
    )
}
