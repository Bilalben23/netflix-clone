import React from 'react';
import { FaGithub, FaHeart } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="border-t border-gray-700 p-6 text-center text-sm bg-[#0d0d0d]">
            <p className="text-gray-400">
                Built with <FaHeart className="inline text-red-500 animate-pulse mx-1" /> by{' '}
                <a
                    href="www.linkedin.com/in/bilal-benyoussef-b38a27251

"
                    target="_blank"
                    rel="noreferrer"
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold hover:from-purple-500 hover:to-blue-400 transition-all duration-300"
                >
                    Bilal Benyoussef
                </a>
            </p>
            <p className="mt-2">
                <a
                    href="https://github.com/Bilalben23/netflix-clone"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 text-gray-300 hover:text-white transition-all duration-300"
                >
                    <FaGithub className="text-xl" /> <span>Open-source on GitHub</span>
                </a>
            </p>
            <p className="mt-4 text-xs text-gray-500 opacity-80">
                &copy; {new Date().getFullYear()} All rights reserved.
            </p>
        </footer>
    );
}
