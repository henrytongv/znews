import axios from 'axios'
import { NewsApiResponse, NewsApiParams } from '@/types/news'

const NEWSDATA_API_BASE_URL = 'https://newsdata.io/api/1'
const API_KEY = process.env.NEWSDATA_API_KEY

if (!API_KEY) {
  console.warn('Warning: NEWSDATA_API_KEY is not set in environment variables')
}

/**
 * Builds the URL for newsdata.io API requests
 * @param endpoint - API endpoint (e.g., 'news')
 * @param params - Query parameters
 * @returns Complete API URL
 */
function buildNewsApiUrl(endpoint: string, params: NewsApiParams): string {
  const url = new URL(`${NEWSDATA_API_BASE_URL}/${endpoint}`)

  // Add API key
  url.searchParams.append('apikey', API_KEY || '')

  // Add other parameters
  if (params.page) url.searchParams.append('page', params.page)
  if (params.category) url.searchParams.append('category', params.category)
  if (params.language) url.searchParams.append('language', params.language)
  if (params.q) url.searchParams.append('q', params.q)
  if (params.country) url.searchParams.append('country', params.country)

  return url.toString()
}

/**
 * Fetches latest news from newsdata.io API
 * @param params - Query parameters for filtering news
 * @returns News API response
 */
export async function fetchLatestNews(
  params: NewsApiParams = {}
): Promise<NewsApiResponse> {
  try {
    // Set default language to English if not specified
    const apiParams: NewsApiParams = {
      language: 'en',
      ...params,
    }

    const url = buildNewsApiUrl('news', apiParams)

    const response = await axios.get<NewsApiResponse>(url, {
      timeout: 10000, // 10 second timeout
    })

    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500
      const message = error.response?.data?.message || error.message

      throw new Error(`API Error (${statusCode}): ${message}`)
    }

    throw error
  }
}

/**
 * Fetches a single article by ID from the cached results
 * Note: newsdata.io doesn't provide a direct endpoint for single articles,
 * so this would need to fetch from a list or implement caching
 * @param id - Article ID
 * @returns Single news article or null if not found
 */
export async function fetchArticleById(id: string) {
  try {
    // For MVP, we'll fetch recent news and find the article
    // In production, this should use a database or caching layer
    const response = await fetchLatestNews({})

    const article = response.results.find(
      (article) => article.article_id === id
    )

    if (!article) {
      throw new Error('Article not found')
    }

    return article
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status || 500
      const message = error.response?.data?.message || error.message

      throw new Error(`API Error (${statusCode}): ${message}`)
    }

    throw error
  }
}

/**
 * Validates that the API key is configured
 * @returns True if API key is configured
 */
export function isApiKeyConfigured(): boolean {
  return Boolean(API_KEY && API_KEY !== 'your_api_key_here')
}
