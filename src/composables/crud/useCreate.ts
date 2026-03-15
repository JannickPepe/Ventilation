import { ref } from 'vue'
import type { ResourceApi } from '@/api/resources/base'

export function useCreate<T>(api: ResourceApi<T>) {
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function createItem(data: Partial<T>): Promise<T | null> {
    loading.value = true
    error.value = null
    try {
      const created = (await api.create(data)) as T
      return created
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create'
      return null
    } finally {
      loading.value = false
    }
  }

  function reset() {
    loading.value = false
    error.value = null
  }

  return { createItem, loading, error, reset }
}
