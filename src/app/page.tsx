'use client'

import { useEffect, useState } from 'react'
import { Typography, Box } from '@mui/material'
import NewsList from '@/components/NewsList'
import ErrorMessage from '@/components/ErrorMessage'
import { NewsArticle } from '@/types/news'

export default function Home() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/news?language=en')

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch news')
      }

      const data = await response.json()
      setArticles(data.results || [])
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load news. Please try again later.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  return (
    <main>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700, color: 'primary.main' }}
        >
          Latest News
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay informed with the latest news from around the world
        </Typography>
      </Box>

      {error && (
        <ErrorMessage
          message={error}
          title="Failed to Load News"
          onRetry={fetchNews}
        />
      )}

      {!error && <NewsList articles={articles} loading={loading} />}
    </main>
  )
}
