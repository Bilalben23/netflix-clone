export default function Section3() {
    return (
        <div className='flex flex-col md:flex-row justify-between mx-auto p-5 w-[90%] sm:w-[80%] md:[70%] lg:w-[60%] items-center my-4'>
            <div className='flex-1 text-center md:text-left'>
                <h2 className='text-xl md:text-2xl lg:text-3xl font-bold mb-2'>Watch everywhere</h2>
                <p className='text-sm text-gray-300'>Stream unlimited and TV Shows on your phone, tablet, laptop, and TV.</p>
            </div>
            <div className='flex-1 relative overflow-hidden pl-1'>
                <img src="../../assets/device-pile.png" alt="device-pile-image" className='w-full h-full z-10 relative' />
                <video loop autoPlay muted className='absolute top-1/2 left-1/2 -translate-y-[83%] -translate-x-1/2 h-1/2 z-0 p-1' >
                    <source src='../../assets/video-devices.m4v' type="video/mp4" />
                </video>
            </div>
        </div>
    )
}
