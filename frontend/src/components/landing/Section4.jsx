export default function Section4() {
    return (
        <div className='flex flex-col-reverse md:flex-row justify-between mx-auto p-5 w-[90%] sm:w-[80%] md:[70%] lg:w-[60%] items-center my-4'>
            <div className='flex-1'>
                <img src="../../assets/kids.png" alt="kids" className='w-full' />
            </div>
            <div className="flex-1 text-center md:text-left">
                <h4 className='text-xl md:text-2xl lg:text-3xl font-bold mb-2'>Create profiles for kids</h4>
                <p className='text-sm text-gray-300'> Send kids on adventures with their favorite characters in a space made just for them—free with your membership.</p>
            </div>
        </div>
    )
}
