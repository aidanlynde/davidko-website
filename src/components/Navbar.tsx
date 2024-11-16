'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700">
          YourLogo
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-green-700">
            Home
          </Link>
          <Link href="/page1" className="hover:text-green-700">
            Page1
          </Link>
          <Link href="/page2" className="hover:text-green-700">
            Page2
          </Link>
          <Link href="/page3" className="hover:text-green-700">
            Page3
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-green-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link href="/" className="block px-4 py-2 hover:bg-green-100">
            Home
          </Link>
          <Link href="/page1" className="block px-4 py-2 hover:bg-green-100">
            Page1
          </Link>
          <Link href="/page2" className="block px-4 py-2 hover:bg-green-100">
            Page2
          </Link>
          <Link href="/page3" className="block px-4 py-2 hover:bg-green-100">
            Page3
          </Link>
        </div>
      )}
    </nav>
  );
}
