'use client'

import { IconButton, Tooltip } from '@mui/material'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'

interface ThemeToggleProps {
  mode: 'light' | 'dark'
  onToggle: () => void
}

export default function ThemeToggle({ mode, onToggle }: ThemeToggleProps) {
  return (
    <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={onToggle}
        color="inherit"
        aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
        sx={{
          ml: 1,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'rotate(20deg)',
          },
        }}
      >
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  )
}
