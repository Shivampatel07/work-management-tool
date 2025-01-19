'use client'

import React, { useState, useEffect } from 'react';
import { Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function CustomErrorPage() {
  const [rotation, setRotation] = useState(0);
  const [errorMessage, setErrorMessage] = useState(0);

  const funnyMessages = [
    "Whoops! The page took a coffee break ☕",
    "Error 404: Page is playing hide and seek 🙈",
    "This page went to get milk and never came back 🥛",
    "Our hamsters powering the server are tired 🐹",
    "Page not found: It's not you, it's us 💔",
    "Looks like this page is practicing social distancing 😷",
    "This page is in another castle 🏰",
    "404: Page got lost in the cloud ☁️",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setErrorMessage(prev => (prev + 1) % funnyMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [funnyMessages.length]);

  const handleRefreshClick = () => {
    setRotation(rotation + 360);
  };

  return (
    <div className="min-h-screen flex items-center justify-center select-none" style={{ backgroundColor: '#16404D' }}>
      <div className="text-center">
        {/* Bouncing 404 Text */}
        <div
          className="text-9xl font-bold mb-8 transition-transform cursor-pointer"
          style={{
            color: '#B8D8E1',
            textShadow: '4px 4px 0px rgba(0,0,0,0.2)'
          }}
        >
          4😵4
        </div>

        {/* Rotating Message */}
        <div className="h-20 flex items-center justify-center">
          <p
            className="text-2xl font-medium mb-8 transition-opacity duration-500"
            style={{
              color: '#8CB9C7',
              animation: 'fadeInOut 3s infinite'
            }}
          >
            {funnyMessages[errorMessage]}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#8CB9C7' }}
          >
            <Home className="w-5 h-5" style={{ color: '#16404D' }} />
            <span style={{ color: '#16404D' }}>Go Home</span>
          </Link>

          <button
            onClick={handleRefreshClick}
            className="px-6 py-3 rounded-lg flex items-center space-x-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: 'rgba(184, 216, 225, 0.1)',
              border: '2px solid #8CB9C7'
            }}
          >
            <RefreshCw
              className="w-5 h-5 transition-transform duration-500"
              style={{
                color: '#8CB9C7',
                transform: `rotate(${rotation}deg)`
              }}
            />
            <span style={{ color: '#8CB9C7' }}>Try Again</span>
          </button>
        </div>

        {/* Hidden Feature */}
        <div
          className="mt-12 text-sm opacity-50 hover:opacity-100 transition-opacity duration-300"
          style={{ color: '#8CB9C7' }}
        >
          Plot twist: The page exists, it&apos;s just invisible 👻
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateY(10px); }
          20% { opacity: 1; transform: translateY(0); }
          80% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
};
