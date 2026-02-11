'use client'

import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material'
import Link from 'next/link'
import { NewsArticle } from '@/types/news'
import { truncateDescription, formatDate } from '@/lib/textUtils'

interface NewsCardProps {
  article: NewsArticle
}

export default function NewsCard({ article }: NewsCardProps) {
  const truncatedDescription = truncateDescription(article.description, 200)
  const imageUrl = article.image_url || '/placeholder-news.png'
  const sourceName = article.source_name || article.source_id

  return (
    <Link
      href={`/article/${article.article_id}`}
      style={{ textDecoration: 'none' }}
      aria-label={`Read article: ${article.title}`}
    >
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          height: '100%',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
        role="article"
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', sm: 180 },
            height: { xs: 200, sm: 'auto' },
            objectFit: 'cover',
          }}
          image={imageUrl}
          alt={article.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
            e.currentTarget.src = '/placeholder-news.png'
          }}
        />
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="h6"
              component="h2"
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                fontWeight: 600,
                lineHeight: 1.3,
                color: 'text.primary',
              }}
            >
              {article.title}
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              flex: 1,
              lineHeight: 1.6,
            }}
          >
            {truncatedDescription}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Chip
              label={sourceName}
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 500,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {formatDate(article.pubDate)}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}
