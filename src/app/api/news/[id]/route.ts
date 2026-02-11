import { NextRequest, NextResponse } from 'next/server'
import { getArticleById } from '@/lib/database'
import { handleApiError } from '@/lib/errorHandler'

export const dynamic = 'force-dynamic'

/**
 * GET /api/news/[id]
 * Fetches a single article from database by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { error: 'Article ID is required', statusCode: 400 },
        { status: 400 }
      )
    }

    // Fetch from database
    const article = await getArticleById(id)

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found', statusCode: 404 },
        { status: 404 }
      )
    }

    return NextResponse.json(article, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=1200',
      },
    })
  } catch (error) {
    const apiError = handleApiError(error, `GET /api/news/${(await params).id}`)

    return NextResponse.json(
      { error: apiError.message, statusCode: apiError.statusCode },
      { status: apiError.statusCode }
    )
  }
}
