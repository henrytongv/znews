'use client'

import { useState, useEffect, useMemo } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import { getTheme } from '@/theme/theme'
import ThemeToggle from '@/components/ThemeToggle'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize theme from localStorage or system preference
  const [mode, setMode] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Load theme preference on mount
  useEffect(() => {
    setMounted(true)
    const savedMode = localStorage.getItem('theme-mode') as 'light' | 'dark' | null

    if (savedMode) {
      setMode(savedMode)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setMode(prefersDark ? 'dark' : 'light')
    }
  }, [])

  // Save theme preference when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('theme-mode', mode)
    }
  }, [mode, mounted])

  const theme = useMemo(() => getTheme(mode), [mode])

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  // Prevent flash of wrong theme
  if (!mounted) {
    return null
  }

  return (
    <html lang="en">
      <head>
        <title>ZNews - Latest News</title>
        <meta name="description" content="Stay updated with the latest news from around the world" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position="static" elevation={1}>
            <Toolbar>
              <Typography
                variant="h6"
                component="a"
                href="/"
                sx={{
                  flexGrow: 1,
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                ZNews
              </Typography>
              <ThemeToggle mode={mode} onToggle={toggleTheme} />
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ py: 4 }}>
            {children}
          </Container>
        </ThemeProvider>
      </body>
    </html>
  )
}
