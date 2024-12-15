'use client';

import React, { useEffect, useState } from 'react';
import InvestorForm from '../components/InvestorForm';
import { Building2, TrendingUp, Timer, Home as HomeIcon } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const benefits = [
    { icon: <Building2 className="w-5 h-5" />, text: "Exclusive Off-Market Properties" },
    { icon: <TrendingUp className="w-5 h-5" />, text: "Pre-Vetted Investment Opportunities" },
    { icon: <Timer className="w-5 h-5" />, text: "Early Access to New Listings" }
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const currentText = benefits[currentBenefitIndex].text;
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 30);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setCurrentBenefitIndex((prev) => (prev + 1) % benefits.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentBenefitIndex]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <img
        src="/chicago.jpg"
        alt="Chicago skyline"
        className="hero-image object-cover w-full h-full fixed inset-0"
      />

      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
        <div className="w-full max-w-4xl mx-auto px-6 py-8 md:py-14 mt-20">
          {/* Enhanced Landing Header */}
          <div className={`text-center mb-8 transition-all duration-1000 ease-out transform 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Main Title with Accent */}
            <div className="flex items-end justify-center mb-3">
              <HomeIcon 
                size={32} // Default (mobile) size
                className="text-yellow-500 inline-block mb-0.5 sm:mb-0 sm:w-10 sm:h-10 md:w-12 md:h-12" 
                strokeWidth={1.5}
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white ml-3">
                Premium Investment Properties
              </h1>
            </div>

            {/* Animated Benefits */}
            <div className="h-6 relative mb-0">
              <div className="flex items-center justify-center gap-2 text-white">
                {benefits[currentBenefitIndex].icon}
                <span className="text-lg md:text-xl min-h-[28px] inline-flex items-center">
                  {displayText}
                  <span className="w-0.5 h-5 bg-white ml-1 animate-pulse"></span>
                </span>
              </div>
            </div>
           
          </div>

          {/* Form Component */}
          <InvestorForm />

          {/* Trust Indicators */}
          <div className="mt-4 text-center">
            <p className="text-white/80 text-sm">
              Trusted by over 500+ investors in the Chicago area
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}