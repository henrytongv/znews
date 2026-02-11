'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Skeleton,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { NewsArticle } from '@/types/news'
import ErrorMessage from '@/components/ErrorMessage'
import { formatDate } from '@/lib/textUtils'

export default function ArticlePage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const articleId = params?.id as string

  const fetchArticle = async () => {
    if (!articleId) {
      setError('Article ID is missing')
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/news/${articleId}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch article')
      }

      const data = await response.json()
      setArticle(data)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load article. Please try again later.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchArticle()
  }, [articleId])

  if (loading) {
    return (
      <Box>
        <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mb: 3 }} />
        <Skeleton variant="text" width="60%" height={50} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
      </Box>
    )
  }

  if (error || !article) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/')}
          sx={{ mb: 3 }}
        >
          Back to News
        </Button>
        <ErrorMessage
          message={error || 'Article not found'}
          title="Error Loading Article"
          onRetry={fetchArticle}
        />
      </Box>
    )
  }

  const imageUrl = article.image_url || '/placeholder-news.png'
  const sourceName = article.source_name || article.source_id

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push('/')}
        sx={{ mb: 3 }}
        aria-label="Back to news list"
      >
        Back to News
      </Button>

      <Card elevation={2}>
        {imageUrl && (
          <CardMedia
            component="img"
            height="400"
            image={imageUrl}
            alt={article.title}
            sx={{ objectFit: 'cover' }}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = '/placeholder-news.png'
            }}
          />
        )}

        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label={sourceName}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600 }}
            />
            <Chip
              label={formatDate(article.pubDate)}
              variant="outlined"
              size="small"
            />
            {article.category && article.category.length > 0 && (
              <Chip
                label={article.category[0]}
                variant="outlined"
                size="small"
                sx={{ textTransform: 'capitalize' }}
              />
            )}
          </Box>

          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              fontWeight: 700,
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            {article.title}
          </Typography>

          {article.creator && article.creator.length > 0 && (
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2, fontStyle: 'italic' }}
            >
              By {article.creator.join(', ')}
            </Typography>
          )}

          <Typography
            variant="body1"
            paragraph
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.8,
              color: 'text.primary',
              mb: 3,
            }}
          >
            {article.description}
          </Typography>

          {article.content && article.content !== article.description && (
            <Typography
              variant="body1"
              paragraph
              sx={{
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.primary',
                mb: 3,
              }}
            >
              {article.content}
            </Typography>
          )}

          <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              endIcon={<OpenInNewIcon />}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read full article on source website"
            >
              Read Full Article
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
