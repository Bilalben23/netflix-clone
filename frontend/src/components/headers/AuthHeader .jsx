import React, { useState } from 'react'
import useLogout from '../../hooks/useLogout';
import { Link } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function AuthHeader() {
    const { user } = useSelector(state => state.auth);
    const logout = useLogout();
    const [isMobileMenuOpen, setIsMobilePhoneOpen] = useState(false);


    const toggleMobileMenu = () => setIsMobilePhoneOpen(!isMobileMenuOpen)

    const signOut = async () => {
        await logout();
    }

    return (
        <header className='flex w-full items-center justify-between py-4 mx-auto max-w-6xl px-4 md:px-10 lg:px-16 fixed top-0 z-50'>
            <div className='flex items-center md:gap-x-10'>
                <button type='button' className='cursor-pointer'>
                    <img src="../../assets/netflix-logo.png" alt="logo" className='w-20 md:w-24 lg:28' />
                </button>

                {/* Desktop menu */}
                <nav className='hidden md:block'>
                    <ul className='flex items-center w-full justify-between gap-x-5 text-sm'>
                        <li>
                            <Link to="/?media=movie" className='link link-hover'>Movies</Link>
                        </li>
                        <li>
                            <Link to="/?media=tv" className='link link-hover'>TV Shows</Link>
                        </li>

                        {/* <li>
                            <Link to="/?media=new-popular" className='link link-hover'>New & Popular</Link>
                        </li> */}
                        <li>
                            <Link to="/history" className='link link-hover'>Search History</Link>
                        </li>
                    </ul>
                </nav>

            </div>
            <div className='flex items-center gap-x-1.5 md:gap-x-2'>
                <Link to="/search" className='block p-2 transition hover:opacity-90'>
                    <Search className='size-6' />
                </Link>
                <div>
                    <img src={`../../assets/${user.image}`} alt="profile-image" className='w-5 md:w-7 rounded-sm' />
                </div>
                <button type='button' className="p-2 cursor-pointer transition hover:opacity-90" onClick={signOut}>
                    <LogOut className='size-6' />
                </button>

                {/* Menu icon in small screens */}
                <button type='button' className='btn btn-sm btn-circle btn-ghost hover:bg-transparent flex md:hidden' onClick={toggleMobileMenu}>
                    <Menu className='size-6' />
                </button>
            </div>


            {/* phone menu */}
            <div className={`md:hidden left-0 absolute p-5 w-full bg-black/50 ease-in-out top-16 transition ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                <nav>
                    <ul className='menu menu-vertical'>
                        <li>
                            <Link to="/">TV Shows</Link>
                        </li>
                        <li>
                            <Link to="/">Movies</Link>
                        </li>
                        <li>
                            <Link to="/">New & Popular</Link>
                        </li>
                        <li>
                            <Link to="/history">Search History</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
