import { ref } from 'vue'
import type { ResourceApi } from '@/api/resources/base'

export function useEdit<T>(api: ResourceApi<T>) {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function loadItem(id: string | number): Promise<T | null> {
    loading.value = true
    error.value = null
    try {
      return (await api.getOne(id)) as T
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load'
      return null
    } finally {
      loading.value = false
    }
  }

  async function updateItem(id: string | number, data: Partial<T>): Promise<T | null> {
    loading.value = true
    error.value = null
    try {
      return (await api.update(id, data)) as T
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update'
      return null
    } finally {
      loading.value = false
    }
  }

  function reset() {
    loading.value = false
    error.value = null
  }

  return { updateItem, loadItem, loading, error, reset }
}
