'use client';

import React, { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';

const subscribeTheme = (callback: () => void) => {
  window.addEventListener('storage', callback);
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  return () => {
    window.removeEventListener('storage', callback);
    observer.disconnect();
  };
};

const getThemeSnapshot = () => {
  return typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
};

const getServerSnapshot = () => 'light';

export const ThemeToggle: React.FC = () => {
  const currentTheme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const isDark = currentTheme === 'dark';
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="p-2 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-[4px] transition-colors cursor-pointer"
    >
      {currentTheme === 'dark' ? (
        <Sun size={17} strokeWidth={1.5} />
      ) : (
        <Moon size={17} strokeWidth={1.5} />
      )}
    </button>
  );
};
