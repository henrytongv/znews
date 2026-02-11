'use client'

import { Stack, Box, Typography, Skeleton, Card, CardContent } from '@mui/material'
import { NewsArticle } from '@/types/news'
import NewsCard from './NewsCard'

interface NewsListProps {
  articles: NewsArticle[]
  loading?: boolean
}

function NewsCardSkeleton() {
  return (
    <Card sx={{ display: 'flex', height: 200 }}>
      <Skeleton variant="rectangular" width={180} height="100%" />
      <CardContent sx={{ flex: 1 }}>
        <Skeleton variant="text" width="80%" height={32} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="60%" />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="rounded" width={100} height={24} />
          <Skeleton variant="text" width={80} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default function NewsList({ articles, loading = false }: NewsListProps) {
  if (loading) {
    return (
      <Stack spacing={3}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <NewsCardSkeleton key={i} />
        ))}
      </Stack>
    )
  }

  if (articles.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
        }}
      >
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No news articles found
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try adjusting your filters or check back later for new content.
        </Typography>
      </Box>
    )
  }

  return (
    <Stack spacing={3}>
      {articles.map((article) => (
        <NewsCard article={article} key={article.article_id} />
      ))}
    </Stack>
  )
}
