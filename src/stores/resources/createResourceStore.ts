import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ResourceApi } from '@/api/resources/base'

export function createResourceStore<T extends { id?: string | number }>(
  storeId: string,
  api: ResourceApi<T>
) {
  return defineStore(storeId, () => {
    const items = ref<T[]>([])
    const currentItem = ref<T | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const isEmpty = computed(() => items.value.length === 0)

    function byId(id: string | number) {
      return items.value.find((item) => String(item.id) === String(id)) ?? null
    }

    async function fetchAll() {
      loading.value = true
      error.value = null
      try {
        items.value = (await api.getAll()) as T[]
        return items.value
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to fetch'
        throw e
      } finally {
        loading.value = false
      }
    }

    async function fetchOne(id: string | number) {
      loading.value = true
      error.value = null
      try {
        currentItem.value = (await api.getOne(id)) as T
        return currentItem.value
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to fetch'
        throw e
      } finally {
        loading.value = false
      }
    }

    async function create(data: Partial<T>) {
      loading.value = true
      error.value = null
      try {
        const created = (await api.create(data)) as T
        ;(items.value as T[]).push(created)
        return created
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to create'
        throw e
      } finally {
        loading.value = false
      }
    }

    async function update(id: string | number, data: Partial<T>) {
      loading.value = true
      error.value = null
      try {
        const updated = (await api.update(id, data)) as T
        const idx = items.value.findIndex((i) => String((i as { id?: string | number }).id) === String(id))
        if (idx >= 0) (items.value as T[])[idx] = updated
        if (currentItem.value && String(currentItem.value.id) === String(id)) {
          currentItem.value = updated
        }
        return updated
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to update'
        throw e
      } finally {
        loading.value = false
      }
    }

    async function remove(id: string | number) {
      loading.value = true
      error.value = null
      try {
        await api.delete(id)
        items.value = items.value.filter((i) => String(i.id) !== String(id))
        if (currentItem.value && String(currentItem.value.id) === String(id)) {
          currentItem.value = null
        }
      } catch (e) {
        error.value = e instanceof Error ? e.message : 'Failed to delete'
        throw e
      } finally {
        loading.value = false
      }
    }

    function $reset() {
      items.value = []
      currentItem.value = null
      loading.value = false
      error.value = null
    }

    return {
      items,
      currentItem,
      loading,
      error,
      isEmpty,
      byId,
      fetchAll,
      fetchOne,
      create,
      update,
      remove,
      $reset
    }
  })
}
