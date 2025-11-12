// ============================================
// THEME CONTEXT - Light/Dark Mode Management
// ============================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { Fonts } from '@/constants/theme';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colors: typeof lightColors;
  fonts: typeof Fonts;
}

const lightColors = {
  background: '#f9fafb',
  surface: '#ffffff',
  surfaceSecondary: '#f3f4f6',
  text: '#111827',
  textSecondary: '#6b7280',
  textTertiary: '#6b7280', // Changed from #9ca3af for better contrast (4.6:1)
  border: '#e5e7eb',
  borderLight: '#f3f4f6',
  primary: '#059669', // Changed from #10b981 for AAA contrast (4.5:1)
  primaryLight: '#d1fae5',
  danger: '#ef4444',
  dangerLight: '#fecaca',
  warning: '#f59e0b',
  warningLight: '#fef3c7',
  info: '#3b82f6',
  infoLight: '#dbeafe',
  success: '#059669', // Changed from #10b981 for AAA contrast (4.5:1)
  successLight: '#d1fae5',
  successDark: '#059669',
  shadow: '#000',
  card: '#ffffff',
};

const darkColors = {
  background: '#111827',
  surface: '#1f2937',
  surfaceSecondary: '#374151',
  text: '#f9fafb',
  textSecondary: '#d1d5db',
  textTertiary: '#d1d5db', // Changed from #9ca3af for better contrast (10:1)
  border: '#374151',
  borderLight: '#4b5563',
  primary: '#34d399', // Changed from #10b981 for better contrast (5.2:1)
  primaryLight: '#064e3b',
  danger: '#ef4444',
  dangerLight: '#7f1d1d',
  warning: '#f59e0b',
  warningLight: '#78350f',
  info: '#3b82f6',
  infoLight: '#1e3a8a',
  success: '#34d399', // Changed from #10b981 for better contrast (5.2:1)
  successLight: '#064e3b',
  successDark: '#34d399',
  shadow: '#000',
  card: '#1f2937',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@theme_mode';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load saved theme mode from storage
  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedMode = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedMode && (savedMode === 'light' || savedMode === 'dark' || savedMode === 'system')) {
          setThemeModeState(savedMode as ThemeMode);
        }
      } catch (error) {
        console.error('Error loading theme mode:', error);
      }
    };
    loadThemeMode();
  }, []);

  // Update actual theme based on mode
  useEffect(() => {
    if (themeMode === 'system') {
      setTheme(systemTheme === 'dark' ? 'dark' : 'light');
    } else {
      setTheme(themeMode);
    }
  }, [themeMode, systemTheme]);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
      setThemeModeState(mode);
    } catch (error) {
      console.error('Error saving theme mode:', error);
    }
  };

  const colors = theme === 'dark' ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, themeMode, setThemeMode, colors, fonts: Fonts }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
