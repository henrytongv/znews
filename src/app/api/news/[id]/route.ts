import { NextRequest, NextResponse } from 'next/server'
import { fetchArticleById, isApiKeyConfigured } from '@/lib/newsApi'
import { handleApiError } from '@/lib/errorHandler'

export const dynamic = 'force-dynamic' // Disable caching

/**
 * GET /api/news/[id]
 * Fetches a single news article by ID
 * @param params - Route parameters containing article ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Get article ID from params
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        {
          error: 'Article ID is required',
          statusCode: 400,
        },
        { status: 400 }
      )
    }

    // Fetch article
    const article = await fetchArticleById(id)

    if (!article) {
      return NextResponse.json(
        {
          error: 'Article not found',
          statusCode: 404,
        },
        { status: 404 }
      )
    }

    // Return successful response
    return NextResponse.json(article, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    })
  } catch (error) {
    // Handle errors with friendly messages
    const apiError = handleApiError(error, `GET /api/news/${(await params).id}`)

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
