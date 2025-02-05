// components/Section2.jsx
import React from 'react'

export default function Section2() {
    return (
        <div className='flex flex-col-reverse md:flex-row justify-between mx-auto p-5 w-[90%] sm:w-[80%] md:[70%] lg:w-[60%] items-center my-4'>
            <div className='flex-1'>
                <div className='relative'>
                    <img src="../../assets/stranger-things-lg.png" alt="stranger-things" className='w-full' />

                    <div className='absolute bottom-5 left-1/2 flex items-center gap-x-2 bg-black rounded-md border-2 border-gray-400 p-2 -translate-x-[55%]'>
                        <div className='w-[50px]'>
                            <img src="../../assets/stranger-things-sm.png" alt="stranger-things" className='w-full' />
                        </div>
                        <div>
                            <p className='font-semibold text-nowrap'>Stranger Things</p>
                            <p className='text-xs text-blue-600'>Downloading...</p>
                        </div>
                        <div className="w-[40px]">
                            <img src="../assets/download-icon.gif" alt="download-icon" className='w-full' />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-1 text-center md:text-left">
                <h3 className='text-xl md:text-2xl lg:text-3xl font-bold mb-2'>Download your shows to watch offline</h3>
                <p className='text-sm text-gray-300'>Watch on a plane, train, or submarine...</p>
            </div>
        </div>
    )
}
