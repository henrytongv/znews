import { fetchLatestNews } from './newsApi'
import { insertArticles, insertSyncLog, isSyncedToday } from './database'
import { logServerError } from './errorHandler'

/**
 * Sync articles from newsdata.io if not already synced today
 * Returns true if sync was performed, false if already synced
 */
export async function syncArticlesIfNeeded(): Promise<boolean> {
  try {
    // Check if already synced today
    const alreadySynced = await isSyncedToday()

    if (alreadySynced) {
      console.log('Articles already synced today, skipping...')
      return false
    }

    console.log('Syncing articles from newsdata.io...')

    // Fetch from newsdata.io
    const response = await fetchLatestNews({
      language: 'en',
    })

    // Insert into database
    const insertedCount = await insertArticles(response.results)

    // Log successful sync
    await insertSyncLog(insertedCount, 'success')

    console.log(`Successfully synced ${insertedCount} articles`)
    return true
  } catch (error) {
    logServerError(error, 'syncArticlesIfNeeded')

    // Log failed sync
    await insertSyncLog(
      0,
      'failed',
      error instanceof Error ? error.message : 'Unknown error'
    )

    throw error
  }
}
