import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLocaleStore } from '@/stores/localeStore'
import { searchHeadings, type SearchResult } from '@/api/locales'

const DEBOUNCE_MS = 200

export function useHeadingSearch() {
  const router = useRouter()
  const { locale } = storeToRefs(useLocaleStore())
  const query = ref('')
  const results = ref<SearchResult[]>([])
  const loading = ref(false)
  let debounceId: ReturnType<typeof setTimeout> | null = null

  function runSearch() {
    const q = query.value.trim()
    if (!q) {
      results.value = []
      return
    }
    loading.value = true
    searchHeadings(q, locale.value)
      .then((r) => {
        results.value = r
      })
      .catch(() => {
        results.value = []
      })
      .finally(() => {
        loading.value = false
      })
  }

  watch(query, () => {
    if (debounceId) clearTimeout(debounceId)
    debounceId = setTimeout(runSearch, DEBOUNCE_MS)
  })

  function goToResult(result: SearchResult) {
    router
      .push({ path: result.route, hash: result.id ? `#${result.id}` : undefined })
      .then(() => {
        if (result.id) {
          const el = document.getElementById(result.id)
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      })
    results.value = []
    query.value = ''
  }

  function clearResults() {
    results.value = []
  }

  return { query, results, loading, goToResult, clearResults }
}
