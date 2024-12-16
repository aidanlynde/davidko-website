'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll to add background and shadow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close the mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-800 shadow-md text-white' : 'bg-transparent text-white'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-8 md:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white">
          David Ko
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Join Us
          </Link>
          <Link href="/page1" className="hover:text-gray-300 transition-colors">
            About
          </Link>
          {/* <Link href="/page2" className="hover:text-gray-300 transition-colors">
            Page2
          </Link>
          <Link href="/page3" className="hover:text-gray-300 transition-colors">
            Page3
          </Link>*/}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white bg-transparent hover:bg-transparent hover:text-gray-300 focus:outline-none transition-colors"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
              d={
                isMenuOpen
                  ? 'M6 18L18 6M6 6l12 12'
                  : 'M4 6h16M4 12h16m-7 6h7'
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-transparent text-white">
          <div className="flex flex-col items-center bg-gray-800 bg-opacity-90 backdrop-blur-md py-4">
            <Link
              href="/"
              className="w-full text-center py-2 px-4 text-white hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/page1"
              className="w-full text-center py-2 px-4 text-white hover:text-gray-300 transition-colors"
            >
              Page1
            </Link>
            <Link
              href="/page2"
              className="w-full text-center py-2 px-4 text-white hover:text-gray-300 transition-colors"
            >
              Page2
            </Link>
            <Link
              href="/page3"
              className="w-full text-center py-2 px-4 text-white hover:text-gray-300 transition-colors"
            >
              Page3
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
