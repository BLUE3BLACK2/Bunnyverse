'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className="p-2 text-black dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-[4px] transition-colors cursor-pointer"
    >
      <Sun size={17} strokeWidth={1.5} className="hidden dark:block" />
      <Moon size={17} strokeWidth={1.5} className="block dark:hidden" />
    </button>
  );
};
