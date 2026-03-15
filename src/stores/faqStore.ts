import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchFaqFromApi } from '@/api/faq'
import type { FaqItem } from '@/api/faq'

export const useFaqStore = defineStore('faq', () => {
  const items = ref<FaqItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const loadedLocale = ref<string | null>(null)

  const isEmpty = computed(() => items.value.length === 0)

  async function fetchFaq(locale: string) {
    if (loadedLocale.value === locale && items.value.length > 0) {
      return items.value
    }
    loading.value = true
    error.value = null
    try {
      const list = await fetchFaqFromApi(locale)
      items.value = list
      loadedLocale.value = locale
      return list
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load FAQ'
      items.value = []
      throw e
    } finally {
      loading.value = false
    }
  }

  function $reset() {
    items.value = []
    loading.value = false
    error.value = null
    loadedLocale.value = null
  }

  return {
    items,
    loading,
    error,
    loadedLocale,
    isEmpty,
    fetchFaq,
    $reset
  }
})
