// src/shared/context/ThemeContext.jsx
import { useEffect } from 'react';
import { ThemeContextObject } from './ThemeContextObject';

export const ThemeContext = ThemeContextObject;

export const ThemeProvider = ({ children }) => {
  const theme = 'dark';

  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const toggleTheme = () => {
    // Theme is permanently dark
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
