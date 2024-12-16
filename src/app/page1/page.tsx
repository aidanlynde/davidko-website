'use client';

import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, FileText } from 'lucide-react';

export default function Page1() {
  return (
    <div className="min-h-screen relative">
      {/* Fixed background */}
      <div className="fixed inset-0 -z-10">
        <img
          src="/chicago.jpg"
          alt="Chicago skyline"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      {/* Scrollable content */}
      <div className="relative pt-20 px-8 md:pt-20">
        <div className="max-w-4xl mx-auto"> 
          <div className="bg-gray-900/80 backdrop-blur-md rounded-lg shadow-2xl p-6 md:p-8 mb-8 text-white">
            {/* Profile Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Headshot */}
              <div className="w-48 h-48 md:w-64 md:h-64 relative shrink-0">
                <img
                  src="/dko.png"
                  alt="Agent Name"
                  className="rounded-lg object-cover w-full h-full shadow-lg ring-2 ring-gray-300/20"
                />
              </div>

              {/* Contact Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  David Ko
                </h1>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-center md:justify-start text-gray-300 hover:text-white transition-colors">
                    <Phone className="w-5 h-5 mr-2" />
                    <a href="tel:+1234567890" className="hover:text-white">
                      (123) 456-7890
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-gray-300 hover:text-white transition-colors">
                    <Mail className="w-5 h-5 mr-2" />
                    <a href="mailto:john@example.com" className="hover:text-white">
                      Ko.david125@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center md:justify-start text-gray-300">
                    <FileText className="w-5 h-5 mr-2" />
                    <span>License #: 123456789</span>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a href="#" className="text-gray-300 hover:text-blue-300 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-gray-600/50 pt-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                About Me
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  As a proud graduate from the University of Illinois at Urbana-Champaign with a Bachelor&apos;s degree in Business Administration, I&apos;ve built a strong foundation in business strategy, leadership, and market analysis—skills I&apos;m excited to apply in the real estate investment industry.
                </p>
                <p>
                  I&apos;m passionate about real estate investing, property development, and market growth opportunities. My approach is driven by continuous learning, relationship-building, and a commitment to helping clients and investors maximize returns on off-market deals.
                </p>
                <p>
                  Whether you&apos;re an experienced investor or just entering the market, I&apos;m here to provide expert guidance, market insights, and tailored real estate solutions. Let&apos;s connect to explore investment opportunities and make profitable real estate transactions happen.
                </p>
              </div>
            </div>

            {/* Credentials */}
            <div className="mt-8 border-t border-gray-600/50 pt-8">
              <h2 className="text-xl font-semibold text-white mb-4">
                Credentials
              </h2>
              <div className="text-gray-300">
                <p className="mb-2">Licensed Real Estate Broker - Illinois</p>
                <p className="mb-2">License #: 123456789</p>
                <p className="mb-2">Brokerage: Chicago Premier Realty</p>
                <p>Brokerage License #: 987654321</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}