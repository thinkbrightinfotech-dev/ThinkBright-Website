import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('thinkbright-theme') as ThemeMode;
      // If user had saved an explicit choice, honor it, but default to white/light
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      if (theme === 'dark') {
        root.classList.remove('light');
        root.classList.add('dark');
        document.body.classList.remove('bg-white', 'text-slate-900');
        document.body.classList.add('bg-slate-950', 'text-slate-100');
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        document.body.classList.remove('bg-slate-950', 'text-slate-100');
        document.body.classList.add('bg-white', 'text-slate-900');
      }
      localStorage.setItem('thinkbright-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (t: ThemeMode) => {
    setThemeState(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
