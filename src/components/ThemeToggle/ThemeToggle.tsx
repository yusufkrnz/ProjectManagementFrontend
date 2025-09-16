'use client';

import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../ThemeProvider/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    console.log('Toggle button clicked, current theme:', theme);
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="relative inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors duration-200"
      aria-label={theme === 'light' ? 'Koyu temaya geç' : 'Aydınlık temaya geç'}
    >
      <span className="sr-only">
        {theme === 'light' ? 'Koyu temaya geç' : 'Aydınlık temaya geç'}
      </span>
      
      {/* Sun Icon - Light Mode */}
      <SunIcon 
        className={`h-5 w-5 transition-all duration-300 ${
          theme === 'light' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 rotate-180 scale-75 absolute'
        }`}
      />
      
      {/* Moon Icon - Dark Mode */}
      <MoonIcon 
        className={`h-5 w-5 transition-all duration-300 ${
          theme === 'dark' 
            ? 'opacity-100 rotate-0 scale-100' 
            : 'opacity-0 -rotate-180 scale-75 absolute'
        }`}
      />
    </button>
  );
};
