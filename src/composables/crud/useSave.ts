import { ref, computed } from 'vue'
import type { ResourceApi } from '@/api/resources/base'

export type WithId = { id?: string | number }

export function useSave<T extends WithId>(api: ResourceApi<T>) {
  const currentId = ref<string | number | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isCreate = computed(() => currentId.value == null)
  const isEdit = computed(() => currentId.value != null)

  async function save(data: Partial<T>): Promise<T | null> {
    loading.value = true
    error.value = null
    try {
      if (currentId.value != null) {
        return (await api.update(currentId.value, data)) as T
      } else {
        return (await api.create(data)) as T
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to save'
      return null
    } finally {
      loading.value = false
    }
  }

  function setEditMode(id: string | number) {
    currentId.value = id
  }

  function setCreateMode() {
    currentId.value = null
  }

  function reset() {
    currentId.value = null
    loading.value = false
    error.value = null
  }

  return { save, isCreate, isEdit, setEditMode, setCreateMode, loading, error, reset }
}
