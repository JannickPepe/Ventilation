export type ToastVariant = 'success' | 'warning' | 'error'

export interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
  autoClose: boolean
  autoCloseDelay: number
  showProgress: boolean
  createdAt: number
}

export interface ToastOptions {
  message: string
  variant?: ToastVariant
  autoClose?: boolean
  autoCloseDelay?: number
  showProgress?: boolean
}
