'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
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
      color: '#263238',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#263238',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#263238',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#263238',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#263238',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#263238',
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
          '&:hover': {
            color: '#1976D2',
          },
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

export default theme
