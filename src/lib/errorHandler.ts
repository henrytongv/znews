import { ApiError } from '@/types/news'

/**
 * Logs server-side errors with context
 * @param error - The error object
 * @param context - Additional context about where the error occurred
 */
export function logServerError(error: unknown, context: string): void {
  console.error(`[Server Error - ${context}]`, {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: new Date().toISOString(),
  })
}

/**
 * Transforms technical errors into user-friendly messages
 * @param error - The error object
 * @returns User-friendly error message
 */
export function getUserFriendlyMessage(error: unknown): string {
  if (error instanceof Error) {
    // Network errors
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return 'Unable to connect to the news service. Please check your internet connection and try again.'
    }

    // Timeout errors
    if (error.message.includes('timeout')) {
      return 'The request took too long. Please try again.'
    }

    // Rate limit errors
    if (error.message.includes('rate limit') || error.message.includes('429')) {
      return 'Too many requests. Please wait a moment and try again.'
    }

    // API key errors
    if (error.message.includes('unauthorized') || error.message.includes('401')) {
      return 'Service configuration error. Please contact support.'
    }

    // Not found errors
    if (error.message.includes('404') || error.message.includes('not found')) {
      return 'The requested content could not be found.'
    }
  }

  // Default friendly message
  return 'Something went wrong. Please try again later.'
}

/**
 * Checks if an error is a network error
 * @param error - The error object
 * @returns True if it's a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('fetch') ||
      error.message.includes('network') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('ETIMEDOUT')
    )
  }
  return false
}

/**
 * Creates a standardized API error object
 * @param message - Error message
 * @param statusCode - HTTP status code
 * @param code - Optional error code
 * @returns ApiError object
 */
export function createApiError(
  message: string,
  statusCode: number,
  code?: string
): ApiError {
  return {
    message,
    statusCode,
    code,
  }
}

/**
 * Handles API errors and returns appropriate response
 * @param error - The error object
 * @param context - Context about where the error occurred
 * @returns ApiError object
 */
export function handleApiError(error: unknown, context: string): ApiError {
  logServerError(error, context)

  const friendlyMessage = getUserFriendlyMessage(error)
  const statusCode = error instanceof Error && 'statusCode' in error
    ? (error as any).statusCode
    : 500

  return createApiError(friendlyMessage, statusCode)
}
