import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-12 h-6 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className} ${
        isDarkMode 
          ? 'bg-gray-700 focus:ring-offset-gray-900' 
          : 'bg-gray-200 focus:ring-offset-white'
      }`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <div
        className={`absolute w-5 h-5 rounded-full transition-all duration-300 ease-in-out transform ${
          isDarkMode 
            ? 'translate-x-3 bg-white shadow-lg' 
            : 'translate-x-0 bg-white shadow-md'
        }`}
      >
        {/* Icon inside the toggle */}
        <div className="flex items-center justify-center w-full h-full">
          {isDarkMode ? (
            // Moon icon for dark mode
            <svg
              className="w-3 h-3 text-gray-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            // Sun icon for light mode
            <svg
              className="w-3 h-3 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
      </div>
      
      {/* Background gradient effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isDarkMode
            ? 'bg-gradient-to-r from-gray-600 to-gray-800'
            : 'bg-gradient-to-r from-gray-100 to-gray-300'
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
