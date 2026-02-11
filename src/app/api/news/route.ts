import { NextRequest, NextResponse } from 'next/server'
import { getArticles, getArticleCount } from '@/lib/database'
import { syncArticlesIfNeeded } from '@/lib/sync'
import { handleApiError } from '@/lib/errorHandler'

export const dynamic = 'force-dynamic'

/**
 * GET /api/news
 * Fetches news articles from database
 * Triggers sync from newsdata.io if not synced today
 */
export async function GET(request: NextRequest) {
  try {
    // Trigger sync if needed (first request of the day)
    await syncArticlesIfNeeded()

    // Extract pagination parameters
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = (page - 1) * limit

    // Fetch from database
    const articles = await getArticles(limit, offset)
    const totalResults = await getArticleCount()

    // Return in newsdata.io compatible format
    return NextResponse.json(
      {
        status: 'success',
        totalResults,
        results: articles,
        page: page.toString(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    )
  } catch (error) {
    const apiError = handleApiError(error, 'GET /api/news')

    return NextResponse.json(
      {
        error: apiError.message,
        statusCode: apiError.statusCode,
      },
      { status: apiError.statusCode }
    )
  }
}
