import React, { useState, useEffect } from 'react';

export default function MainPageLoader() {
  const quotes = [
    "Reticulating splines...",
    "Generating witty dialog...",
    "Swapping time and space...",
    "Spinning violently around the y-axis...",
    "Tokenizing real life...",
    "Bending the spoon...",
    "Filtering morale...",
    "Don't think of purple hippos...",
    "Charging flux capacitors...",
    "Adjusting temporal flow..."
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote(prev => (prev + 1) % quotes.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#16404D' }}>
      <div className="text-center">
        {/* Bouncing Dots Animation */}
        <div className="flex justify-center mb-8 space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full animate-bounce"
              style={{
                backgroundColor: '#8CB9C7',
                animationDelay: `${i * 0.15}s`,
                animationDuration: '0.8s',
                boxShadow: '0 0 10px rgba(140, 185, 199, 0.5)'
              }}
            />
          ))}
        </div>

        {/* Quote Display */}
        <div className="h-8">
          <p
            className="text-lg font-medium transition-opacity duration-300"
            style={{
              color: '#B8D8E1',
              opacity: 1,
              transform: 'translateY(0)',
              animation: 'fadeInOut 2.5s infinite',
              textShadow: '0 0 8px rgba(184, 216, 225, 0.3)'
            }}
          >
            {quotes[currentQuote]}
          </p>
        </div>

        {/* CSS Animation */}
        <style jsx>{`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(10px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
          }
        `}</style>
      </div>
    </div>
  );
};