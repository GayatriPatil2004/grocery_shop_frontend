// src/shared/hooks/useTheme.js
import { useContext } from 'react';
import { ThemeContextObject } from '../context/ThemeContextObject';

export const useTheme = () => {
  const context = useContext(ThemeContextObject);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
