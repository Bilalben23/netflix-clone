import useQueryParams from '../hooks/useQueryParams'
import useSearch from '../hooks/useSearch';
import { useFormik } from 'formik';
import { Search } from "lucide-react";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { Img } from "react-image";
import { useEffect } from 'react';
import * as Yup from "yup";


export default function SearchHub() {
    const { getParam, setParam, removeParam } = useQueryParams();
    const activeTab = getParam("tab") || "movie";
    const searchTerm = getParam("search") || "";

    const { handleSubmit, getFieldProps, resetForm } = useFormik({
        initialValues: { searchTerm: "" },
        onSubmit: (values) => {
            setParam("search", values.searchTerm)
        },
        validationSchema: Yup.object({
            searchTerm: Yup.string()
                .trim()
                .required("Search term is required")
        })
    })

    const { data, isLoading, isError, error } = useSearch(activeTab, searchTerm)

    function handleTabClick(tab) {
        setParam("tab", tab);
    }

    useEffect(() => {
        removeParam("search")
        resetForm();
    }, [activeTab])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])



    return (
        <div className='min-h-screen pt-18 mb-22'>
            <div className='container mx-auto px-4'>

                {/* Nav buttons */}
                <div className='flex items-center justify-center flex-wrap gap-5  mx-auto w-fit'>
                    <button
                        type="button"
                        className={`btn ${activeTab === "movie" ? "btn-error text-black" : ""}`}
                        onClick={() => handleTabClick("movie")}
                    >Movies</button>
                    <button
                        type="button"
                        className={`btn ${activeTab === "tv" ? "btn-error text-black" : ""}`}
                        onClick={() => handleTabClick("tv")}
                    >TV Shows</button>
                    <button
                        type="button"
                        className={`btn ${activeTab === "person" ? "btn-error text-black" : ""}`}
                        onClick={() => handleTabClick("person")}
                    >Person</button>
                </div>

                {/* Search input */}
                <div className='mt-8'>
                    <form onSubmit={handleSubmit} className='flex items-center justify-center gap-x-5'>
                        <input
                            type="text"
                            name='searchTerm'
                            className='input input-bordered w-full sm:w-sm md:w-md'
                            required
                            readOnly={isLoading}
                            placeholder={`Search for a ${activeTab === "tv" ? "tv show" : activeTab}`}
                            {...getFieldProps("searchTerm")}
                        />
                        <button type="submit" className='btn'>
                            <Search size={30} />
                        </button>
                    </form>
                </div>


                {/* display results */}
                {searchTerm === "" && (
                    <div className="flex justify-center items-center py-10">
                        <div className="p-6 text-center">
                            <p className="text-lg md:text-xl font-semibold">🔎 Start typing to search...</p>
                        </div>
                    </div>
                )}

                {
                    !isError
                        ? <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 mt-15'>
                            {
                                isLoading
                                    ? Array.from({ length: 20 }).map((_, index) => (
                                        <div className='aspect-[2/3]' key={index}>
                                            <Skeleton key={index} className='size-full' width="100%" borderRadius={0} />
                                            <Skeleton height={25} className='mt-2' />
                                        </div>
                                    ))
                                    : data?.data?.map(item => {
                                        if (!item?.profile_path && !item?.poster_path) return null;
                                        const isPerson = activeTab === "person";
                                        const imagePath = isPerson ? item?.profile_path : item?.poster_path;
                                        const linkTo = isPerson ? `/person/${item?.id}` : `/watch/${item?.id}?media=${activeTab}`;
                                        let imgPlaceholder = ""
                                        if (isPerson) {
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

                                        return <Link to={linkTo} key={item?.id} className='block bg-slate-900 pb-2' title='Click to see more details'>
                                            <div className='mb-2 aspect-[2/3] min-w-full max-h-[400px] overflow-hidden border border-gray-900'>
                                                <Img
                                                    src={`${ORIGINAL_IMG_BASE_URL}${imagePath}`}
                                                    alt={item?.name || item?.title}
                                                    loader={<Skeleton className='aspect-[2/3]' width="100%" borderRadius={0} />}
                                                    unloader={
                                                        <img src={`/assets/${imgPlaceholder}`} className='size-full' alt={`${activeTab}-placeholder`} />
                                                    }
                                                    className='size-full object-fill transition-transform hover:scale-105 duration-300'
                                                />
                                            </div>
                                            <p className='font-semibold md:text-lg px-2 text-center line-clamp-2'>{item?.name || item?.title}</p>
                                        </Link>
                                    })
                            }
                        </div>
                        : <div className="flex justify-center items-center mt-10 md:w-[80%] mx-auto">
                            <div className="py-10 flex-col items-center gap-y-3 flex text-center">
                                <img src="/assets/netflix-logo.png" alt="netflix-logo" className='w-32 md:36 lg:w-40' />

                                {error?.status === 404 ? (
                                    <p className="font-semibold text-balance">🔍 No results found for "{searchTerm}". Try a different search.</p>
                                ) : (
                                    <>
                                        <p className="font-semibold">❌ Something went wrong. Please try again.</p>
                                        {error?.message && <p>{error.message}</p>}
                                    </>
                                )}
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}

