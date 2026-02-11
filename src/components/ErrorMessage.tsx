'use client'

import { Alert, AlertTitle, Button, Box } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'

interface ErrorMessageProps {
  message: string
  title?: string
  severity?: 'error' | 'warning' | 'info'
  onRetry?: () => void
}

export default function ErrorMessage({
  message,
  title = 'Error',
  severity = 'error',
  onRetry,
}: ErrorMessageProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', my: 4 }}>
      <Alert
        severity={severity}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<RefreshIcon />}
              aria-label="Retry loading news"
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  )
}
