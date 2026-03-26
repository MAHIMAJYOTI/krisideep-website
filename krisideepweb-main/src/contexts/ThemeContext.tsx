import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, Theme } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem('krisiDeepTheme');
    return (savedMode as ThemeMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('krisiDeepTheme', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#2E7D32' : '#4CAF50',
        light: mode === 'light' ? '#4CAF50' : '#66BB6A',
        dark: mode === 'light' ? '#1B5E20' : '#2E7D32',
        contrastText: '#ffffff',
      },
      secondary: {
        main: mode === 'light' ? '#FF8F00' : '#FFB74D',
        light: mode === 'light' ? '#FFB74D' : '#FFCC80',
        dark: mode === 'light' ? '#E65100' : '#FF8F00',
        contrastText: '#ffffff',
      },
      success: {
        main: mode === 'light' ? '#4CAF50' : '#66BB6A',
        light: mode === 'light' ? '#81C784' : '#A5D6A7',
        dark: mode === 'light' ? '#388E3C' : '#4CAF50',
      },
      warning: {
        main: mode === 'light' ? '#FF9800' : '#FFB74D',
        light: mode === 'light' ? '#FFB74D' : '#FFCC80',
        dark: mode === 'light' ? '#F57C00' : '#FF9800',
      },
      error: {
        main: mode === 'light' ? '#F44336' : '#EF5350',
        light: mode === 'light' ? '#EF5350' : '#FFCDD2',
        dark: mode === 'light' ? '#D32F2F' : '#F44336',
      },
      info: {
        main: mode === 'light' ? '#2196F3' : '#42A5F5',
        light: mode === 'light' ? '#42A5F5' : '#90CAF9',
        dark: mode === 'light' ? '#1976D2' : '#2196F3',
      },
      background: {
        default: mode === 'light' ? '#f8fafc' : '#0a0a0a',
        paper: mode === 'light' ? '#ffffff' : '#1a1a1a',
      },
      text: {
        primary: mode === 'light' ? '#1a202c' : '#f7fafc',
        secondary: mode === 'light' ? '#4a5568' : '#a0aec0',
      },
      divider: mode === 'light' ? '#e2e8f0' : '#2d3748',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.4,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
      },
      button: {
        fontWeight: 500,
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 500,
            padding: '10px 24px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: mode === 'light' 
                ? '0 4px 12px rgba(0,0,0,0.15)' 
                : '0 4px 12px rgba(255,255,255,0.1)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          },
          contained: {
            background: mode === 'light' 
              ? 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)'
              : 'linear-gradient(135deg, #4CAF50 0%, #66BB6A 100%)',
            '&:hover': {
              background: mode === 'light' 
                ? 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)'
                : 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'light' ? '#ffffff' : '#1a1a1a',
            color: mode === 'light' ? '#1a202c' : '#f7fafc',
            boxShadow: mode === 'light' 
              ? '0 1px 3px rgba(0,0,0,0.1)' 
              : '0 1px 3px rgba(255,255,255,0.1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'light' 
              ? '0 4px 20px rgba(0,0,0,0.08)' 
              : '0 4px 20px rgba(255,255,255,0.05)',
            border: mode === 'light' 
              ? '1px solid rgba(0,0,0,0.05)' 
              : '1px solid rgba(255,255,255,0.05)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: mode === 'light' 
                ? '0 8px 30px rgba(0,0,0,0.12)' 
                : '0 8px 30px rgba(255,255,255,0.08)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            backgroundImage: 'none',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            fontWeight: 500,
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
