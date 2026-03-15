/** Default duration in ms before auto-closing a toast. */
export const TOAST_DEFAULT_DURATION = 5000

/** Generate a unique id for a toast. */
export function createToastId(): string {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}
