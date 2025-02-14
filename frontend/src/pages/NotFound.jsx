import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <section className='min-h-screen not-found-bg relative flex items-center justify-center'>
            <header className='py-4 bg-black px-8 fixed top-0 w-full z-1'>
                <img src="/assets/netflix-logo.png" alt="netflix-logo" className='w-20' />
            </header>
            <div className='select-none bg-radial from-black/30 via-black/10 w-[90%] sm:w-[70%] md:w-[50%] p-5 items-center flex flex-col gap-y-5 text-center'>
                <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl'>Lost your way?</h1>
                <p className='tracking-wide text-xs sm:text-sm md:text-base'>Sorry, we can't find you page, You'll find lots to explorer on the home page.</p>
                <Link to="/" className='btn bg-white text-black px-6 transition-opacity hover:opacity-80'>Netflix Home</Link>
            </div>
        </section>
    )
} 