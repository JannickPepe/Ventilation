export type AppError = {
  code?: string
  message: string
  status?: number
  details?: unknown
}

export type ErrorHandler = (error: AppError) => void

let globalHandler: ErrorHandler = (err) => {
  console.error('[App Error]', err)
}

export function setErrorHandler(handler: ErrorHandler): void {
  globalHandler = handler
}

export function handleError(error: unknown): void {
  const appError: AppError = normalizeError(error)
  globalHandler(appError)
}

export function normalizeError(error: unknown): AppError {
  if (isAppError(error)) return error
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error
    }
  }
  return { message: String(error) }
}

function isAppError(v: unknown): v is AppError {
  return typeof v === 'object' && v !== null && 'message' in v && typeof (v as AppError).message === 'string'
}
