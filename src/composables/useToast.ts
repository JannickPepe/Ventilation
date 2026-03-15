import { useToastStore } from '@/stores/toastStore'

export function useToast() {
  const toastStore = useToastStore()

  return {
    show: toastStore.show,
    success: toastStore.success,
    warning: toastStore.warning,
    error: toastStore.error,
    dismiss: toastStore.dismiss,
    dismissAll: toastStore.dismissAll
  }
}
