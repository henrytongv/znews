import type { Metadata } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { AppBar, Toolbar, Typography, Container } from '@mui/material'
import theme from '@/theme/theme'
import './globals.css'

export const metadata: Metadata = {
  title: 'ZNews - Latest News',
  description: 'Stay updated with the latest news from around the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
