import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ToastItem, ToastOptions } from '@/types/toast'
import { createToastId } from '@/utils/toast'
import { TOAST_DEFAULT_DURATION } from '@/utils/toast'

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastItem[]>([])

  function show(options: ToastOptions): string {
    const id = createToastId()
    const autoClose = options.autoClose ?? true
    const autoCloseDelay = options.autoCloseDelay ?? TOAST_DEFAULT_DURATION
    const showProgress = options.showProgress ?? true
    const item: ToastItem = {
      id,
      message: options.message,
      variant: options.variant ?? 'success',
      autoClose,
      autoCloseDelay,
      showProgress: autoClose && showProgress,
      createdAt: Date.now()
    }
    toasts.value = [...toasts.value, item]
    return id
  }

  function success(message: string, options?: Partial<ToastOptions>): string {
    return show({ ...options, message, variant: 'success' })
  }

  function warning(message: string, options?: Partial<ToastOptions>): string {
    return show({ ...options, message, variant: 'warning' })
  }

  function error(message: string, options?: Partial<ToastOptions>): string {
    return show({ ...options, message, variant: 'error' })
  }

  function dismiss(id: string): void {
    toasts.value = toasts.value.filter((t) => t.id !== id)
  }

  function dismissAll(): void {
    toasts.value = []
  }

  return {
    toasts,
    show,
    success,
    warning,
    error,
    dismiss,
    dismissAll
  }
})
