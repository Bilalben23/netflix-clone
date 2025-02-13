import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import Footer from './Footer'

export default function AuthLayout() {
    return (
        <>
            <section className='hero-bg'>
                <header className='p-2 grid grid-cols-3'>
                    <div className='flex items-center justify-end'>
                        <Link to="/" className="cursor-pointer hover:opacity-80 transition">
                            <img
                                src='/assets/netflix-logo.png'
                                alt='netflix-logo'
                                className='w-40 p-1'
                            />
                        </Link>
                    </div>
                </header>

                {/* signin or signup components */}
                <Outlet />
            </section>
            <Footer />
        </>
    )
}
