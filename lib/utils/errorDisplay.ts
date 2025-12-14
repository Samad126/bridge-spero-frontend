import { getErrorMessage, getFieldErrors } from '../types/apiErrorTypes';

/**
 * Display error to user using browser alert
 * Can be replaced with a toast library in the future
 */
export function displayError(error: unknown): void {
  const message = getErrorMessage(error);
  alert(message);
}

/**
 * Display field-specific errors
 * Useful for form validation errors
 */
export function displayFieldErrors(error: unknown): Record<string, string> {
  return getFieldErrors(error);
}

/**
 * Log error details to console for debugging
 */
export function logError(error: unknown, context?: string): void {
  const prefix = context ? `[${context}]` : '';
  console.error(`${prefix} Error:`, error);
}

/**
 * Handle API error with logging and user notification
 */
export function handleApiError(error: unknown, context?: string): void {
  logError(error, context);
  displayError(error);
}
