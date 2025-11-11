'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    // Apply theme on mount (client-side only)
    const stored = localStorage.getItem('theme');
    const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    setIsDark(theme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Don't render until hydrated
  if (isDark === null) return null;

  return (

      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-semibold"
        aria-label="Toggle dark mode"
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? '☀️' : '🌙'}
      </button>

  );
}

