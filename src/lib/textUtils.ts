/**
 * Truncates text to a specified number of words, adding "..." if truncated
 * @param text - The text to truncate
 * @param maxWords - Maximum number of words (default: 200)
 * @returns Truncated text with "..." appended if truncated
 */
export function truncateDescription(
  text: string | null | undefined,
  maxWords: number = 200
): string {
  if (!text) return ''

  const words = text.trim().split(/\s+/)

  if (words.length <= maxWords) {
    return text
  }

  return words.slice(0, maxWords).join(' ') + '...'
}

/**
 * Formats a date string into a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffHours < 1) {
    return 'Just now'
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  } else {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }
}
