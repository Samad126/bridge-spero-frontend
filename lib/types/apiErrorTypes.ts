/**
 * Backend Error Schema Types
 * Defines the standard error response format from the backend API
 */

export interface FieldError {
  field: string;
  message: string;
}

export interface BackendErrorResponse {
  requestId?: string;
  errorCode: string;
  errorMessage: string;
  errors?: FieldError[] | null;
  timestamp?: string;
}

/**
 * RTK Query error type
 */
export interface RTKQueryError {
  status: number;
  data: BackendErrorResponse;
}

/**
 * Type guard to check if an error is a BackendErrorResponse
 */
export function isBackendError(error: unknown): error is BackendErrorResponse {
  return (
    typeof error === 'object' &&
    error !== null &&
    'errorCode' in error &&
    'errorMessage' in error
  );
}

/**
 * Type guard to check if an error is an RTK Query error
 */
export function isRTKQueryError(error: unknown): error is RTKQueryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error &&
    typeof (error as RTKQueryError).data === 'object'
  );
}

/**
 * Extract backend error from RTK Query error or direct error
 */
export function extractBackendError(error: unknown): BackendErrorResponse | null {
  // Check if it's an RTK Query error with data property
  if (isRTKQueryError(error) && isBackendError(error.data)) {
    return error.data;
  }

  // Check if it's a direct backend error
  if (isBackendError(error)) {
    return error;
  }

  return null;
}

/**
 * Extract user-friendly error message from any error type
 */
export function getErrorMessage(error: unknown): string {
  const backendError = extractBackendError(error);

  if (backendError) {
    // If there are field-specific errors, combine them
    if (backendError.errors && backendError.errors.length > 0) {
      return backendError.errors.map(e => `${e.field}: ${e.message}`).join('\n');
    }
    return backendError.errorMessage;
  }

  // Fallback for unknown error types
  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
}

/**
 * Extract field errors as a map for form validation
 */
export function getFieldErrors(error: unknown): Record<string, string> {
  const backendError = extractBackendError(error);

  if (backendError && backendError.errors) {
    return backendError.errors.reduce((acc, err) => {
      acc[err.field] = err.message;
      return acc;
    }, {} as Record<string, string>);
  }
  return {};
}
