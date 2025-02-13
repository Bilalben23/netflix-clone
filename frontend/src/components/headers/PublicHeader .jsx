import React from 'react'
import { Link } from 'react-router-dom'

export default function PublicHeader() {
    return (
        <header className='flex items-center justify-between p-4 pb-10 mx-w-6xl mx-auto'>
            <button>
                <img src="/assets/netflix-logo.png" alt="logo" className='w-32 md:w-48' />
            </button>
            <Link to="/signin" className="btn btn-error text-white bg-red-500">
                Sign In
            </Link>
        </header>
    )
}
