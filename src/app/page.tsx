'use client';

import React from 'react';
import InvestorForm from '../components/InvestorForm';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src="/chicago.jpg"
        alt="Chicago skyline"
        className="hero-image object-cover w-full h-full fixed inset-0"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
          {/* Landing Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Your Next Investment Property Is One Click Away!
            </h1>
          </div>

          {/* Form Component */}
          <InvestorForm />
        </div>
      </div>
    </div>
  );
}