import { sql } from '@vercel/postgres'
import { NewsArticle } from '@/types/news'

/**
 * Check if articles have been synced today
 */
export async function isSyncedToday(): Promise<boolean> {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  const result = await sql`
    SELECT sync_date FROM sync_log
    WHERE sync_date = ${today} AND status = 'success'
  `

  return result.rows.length > 0
}

/**
 * Insert sync log entry for today
 */
export async function insertSyncLog(
  articlesCount: number,
  status: 'success' | 'failed',
  errorMessage?: string
) {
  const today = new Date().toISOString().split('T')[0]

  await sql`
    INSERT INTO sync_log (sync_date, articles_count, status, error_message)
    VALUES (${today}, ${articlesCount}, ${status}, ${errorMessage || null})
    ON CONFLICT (sync_date)
    DO UPDATE SET
      articles_count = ${articlesCount},
      status = ${status},
      error_message = ${errorMessage || null},
      synced_at = NOW()
  `
}

/**
 * Insert articles into database
 */
export async function insertArticles(articles: NewsArticle[]): Promise<number> {
  let insertedCount = 0

  for (const article of articles) {
    try {
      // Convert arrays to proper format for PostgreSQL
      const category = article.category ? `{${article.category.join(',')}}` : null
      const country = article.country ? `{${article.country.join(',')}}` : null
      const keywords = article.keywords ? `{${article.keywords.join(',')}}` : null
      const creator = article.creator ? `{${article.creator.join(',')}}` : null

      await sql`
        INSERT INTO articles (
          article_id, title, description, content, image_url,
          source_id, source_name, source_url, link, pub_date,
          category, language, country, keywords, creator
        ) VALUES (
          ${article.article_id},
          ${article.title},
          ${article.description},
          ${article.content || null},
          ${article.image_url || null},
          ${article.source_id},
          ${article.source_name || null},
          ${article.source_url || null},
          ${article.link},
          ${article.pubDate},
          ${category},
          ${article.language || null},
          ${country},
          ${keywords},
          ${creator}
        )
        ON CONFLICT (article_id) DO NOTHING
      `
      insertedCount++
    } catch (error) {
      console.error(`Failed to insert article ${article.article_id}:`, error)
    }
  }

  return insertedCount
}

/**
 * Get articles from database
 */
export async function getArticles(
  limit: number = 50,
  offset: number = 0
): Promise<NewsArticle[]> {
  const result = await sql`
    SELECT * FROM articles
    ORDER BY pub_date DESC
    LIMIT ${limit} OFFSET ${offset}
  `

  return result.rows as NewsArticle[]
}

/**
 * Get single article by ID
 */
export async function getArticleById(articleId: string): Promise<NewsArticle | null> {
  const result = await sql`
    SELECT * FROM articles
    WHERE article_id = ${articleId}
  `

  return (result.rows[0] as NewsArticle) || null
}

/**
 * Get total article count
 */
export async function getArticleCount(): Promise<number> {
  const result = await sql`
    SELECT COUNT(*) as count FROM articles
  `

  return parseInt(result.rows[0].count)
}
