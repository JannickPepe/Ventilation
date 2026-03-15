import { ref } from 'vue'
import type { ResourceApi } from '@/api/resources/base'

export function useDelete<T>(api: ResourceApi<T>) {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function deleteItem(id: string | number): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      await api.delete(id)
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete'
      return false
    } finally {
      loading.value = false
    }
  }

  async function confirmDelete(id: string | number, message?: string): Promise<boolean> {
    if (message && !window.confirm(message)) return false
    return deleteItem(id)
  }

  function reset() {
    loading.value = false
    error.value = null
  }

  return { deleteItem, confirmDelete, loading, error, reset }
}
