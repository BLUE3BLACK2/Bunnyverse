import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',

  setTheme: (theme: Theme) => {
    set({ theme });
    if (typeof window !== 'undefined') {
      localStorage.setItem('bunnyverse-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.style.colorScheme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    }
  },

  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(nextTheme);
  },

  initTheme: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('bunnyverse-theme') as Theme | null;
      if (stored === 'dark' || stored === 'light') {
        get().setTheme(stored);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        get().setTheme(prefersDark ? 'dark' : 'light');
      }
    }
  }
}));
