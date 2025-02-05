export default function Section1() {
    return (
        <div className='flex flex-col md:flex-row justify-between mx-auto p-5 w-[90%] sm:w-[80%] md:[70%] lg:w-[60%] items-center my-4'>
            <div className='flex-1 text-center md:text-left'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-bold mb-2'>Enjoy on your TV</h2>
                <p className='text-sm text-gray-300'>Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
            </div>
            <div className='flex-1 relative px-12 py-5.5'>
                <img src="../../assets/tv.png" alt="tv-image" className='w-full h-full z-10 relative' />
                <video loop autoPlay muted className='absolute top-1/2 left-1/2 -translate-1/2 h-1/2 z-0' >
                    <source src='../../assets/hero-vid.m4v' type="video/mp4" />
                </video>
            </div>
        </div>
    )
}
