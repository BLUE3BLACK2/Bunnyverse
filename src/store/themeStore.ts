import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',
  themeMode: 'system',

  setThemeMode: (mode: ThemeMode) => {
    set({ themeMode: mode });
    if (typeof window !== 'undefined') {
      localStorage.setItem('bunnyverse-theme-mode', mode);

      if (mode === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        get().setTheme(prefersDark ? 'dark' : 'light');
      } else {
        get().setTheme(mode);
      }
    }
  },

  setTheme: (theme: 'light' | 'dark') => {
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
    get().setThemeMode(nextTheme);
  },

  initTheme: () => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('bunnyverse-theme-mode') as ThemeMode | null;
      const storedTheme = localStorage.getItem('bunnyverse-theme') as 'light' | 'dark' | null;

      if (storedMode === 'system') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        set({ themeMode: 'system' });
        get().setTheme(prefersDark ? 'dark' : 'light');
      } else if (storedMode === 'dark' || storedMode === 'light') {
        set({ themeMode: storedMode });
        get().setTheme(storedMode);
      } else if (storedTheme === 'dark' || storedTheme === 'light') {
        set({ themeMode: storedTheme });
        get().setTheme(storedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        set({ themeMode: 'system' });
        get().setTheme(prefersDark ? 'dark' : 'light');
      }

      // Listen for system theme changes if in system mode
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemChange = (e: MediaQueryListEvent) => {
        if (get().themeMode === 'system') {
          get().setTheme(e.matches ? 'dark' : 'light');
        }
      };

      mediaQuery.addEventListener('change', handleSystemChange);
    }
  }
}));
