export interface NewsArticle {
  article_id: string
  title: string
  description: string | null
  content?: string | null
  image_url?: string | null
  source_id: string
  source_name?: string
  source_url?: string
  source_icon?: string | null
  pubDate: string
  category?: string[]
  language?: string
  link: string
  creator?: string[] | null
  keywords?: string[] | null
  country?: string[]
}

export interface NewsApiResponse {
  status: string
  totalResults: number
  results: NewsArticle[]
  nextPage?: string | null
}

export interface ApiError {
  message: string
  code?: string
  statusCode: number
}

export interface NewsApiParams {
  page?: string
  category?: string
  language?: string
  q?: string
  country?: string
}
