'use client'

import { createTheme, PaletteMode } from '@mui/material/styles'

export const getTheme = (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode colors (current)
          primary: {
            main: '#1565C0', // Deep blue
            light: '#1976D2',
            dark: '#0D47A1',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#0097A7', // Teal
            light: '#00ACC1',
            dark: '#00838F',
            contrastText: '#FFFFFF',
          },
          background: {
            default: '#F5F7FA', // Cool light gray
            paper: '#FFFFFF',
          },
          text: {
            primary: '#263238', // Dark blue-gray
            secondary: '#37474F', // Medium blue-gray
          },
          divider: '#ECEFF1',
        }
      : {
          // Dark mode colors (cold palette)
          primary: {
            main: '#42A5F5', // Lighter blue for dark mode
            light: '#64B5F6',
            dark: '#1E88E5',
            contrastText: '#000000',
          },
          secondary: {
            main: '#26C6DA', // Lighter teal for dark mode
            light: '#4DD0E1',
            dark: '#00ACC1',
            contrastText: '#000000',
          },
          background: {
            default: '#0A1929', // Deep blue-gray
            paper: '#132F4C', // Slightly lighter blue-gray
          },
          text: {
            primary: '#E3F2FD', // Light blue tint for readability
            secondary: '#B0BEC5', // Blue-gray for secondary text
          },
          divider: '#1E3A52',
        }
    ),
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s ease-in-out, transform 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)',
            cursor: 'pointer',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 20px',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.16)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          transition: 'color 0.2s ease-in-out',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        },
      },
    },
  },
})

export default getTheme('light') // Default export for compatibility
