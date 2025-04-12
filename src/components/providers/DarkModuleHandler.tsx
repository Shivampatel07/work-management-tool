'use client';

import { useEffect } from 'react';

export default function DarkModuleHandler() {
  useEffect(() => {
    const updateDarkMode = (e: MediaQueryListEvent) => {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial dark mode based on system preference
    if (mediaQuery.matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Listen for changes to the system dark mode preference
    mediaQuery.addEventListener('change', updateDarkMode);

    // Cleanup listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', updateDarkMode);
    };
  }, []);

  return null;
}