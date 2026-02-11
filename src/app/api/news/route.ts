import { NextRequest, NextResponse } from 'next/server'
import { fetchLatestNews, isApiKeyConfigured } from '@/lib/newsApi'
import { handleApiError } from '@/lib/errorHandler'

export const dynamic = 'force-dynamic' // Disable caching for news updates

/**
 * GET /api/news
 * Fetches latest news articles
 * Query parameters:
 * - page: Pagination page
 * - category: News category filter
 * - q: Search query
 * - language: Language filter (default: 'en')
 * - country: Country filter
 */
export async function GET(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!isApiKeyConfigured()) {
      return NextResponse.json(
        {
          error: 'News service is not properly configured. Please contact support.',
          statusCode: 503,
        },
        { status: 503 }
      )
    }

    // Extract query parameters
    const searchParams = request.nextUrl.searchParams
    const page = searchParams.get('page') || undefined
    const category = searchParams.get('category') || undefined
    const q = searchParams.get('q') || undefined
    const language = searchParams.get('language') || 'en'
    const country = searchParams.get('country') || undefined

    // Fetch news from newsdata.io
    const data = await fetchLatestNews({
      page,
      category,
      q,
      language,
      country,
    })

    // Return successful response
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    // Handle errors with friendly messages
    const apiError = handleApiError(error, 'GET /api/news')

    return NextResponse.json(
      {
        error: apiError.message,
        statusCode: apiError.statusCode,
        code: apiError.code,
      },
      { status: apiError.statusCode }
    )
  }
}
