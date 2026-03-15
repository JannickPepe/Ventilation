import { storeToRefs } from 'pinia'
import { useFaqStore } from '@/stores/faqStore'
import { useLocaleStore } from '@/stores/localeStore'

/**
 * Composable for FAQ: exposes store state. Fetch is done by the view (e.g. HomeView) via ensureLoaded(),
 * not inside the FAQ component, per convention: new API resource = store; component only reads from store.
 */
export function useFaq() {
  const faqStore = useFaqStore()
  const localeStore = useLocaleStore()
  const { items, loading, error, isEmpty } = storeToRefs(faqStore)

  function ensureLoaded() {
    return faqStore.fetchFaq(localeStore.locale)
  }

  return {
    items,
    loading,
    error,
    isEmpty,
    ensureLoaded,
    locale: localeStore.locale
  }
}
