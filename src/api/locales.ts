import { apiClient } from '@/api/client'

export type LocaleMessages = Record<string, unknown>

/**
 * Fetch locale messages from backend (source of truth).
 * Used to hydrate vue-i18n. Falls back to frontend bundles if backend is unavailable.
 */
export async function fetchLocale(locale: string): Promise<LocaleMessages> {
  const { data } = await apiClient.get<LocaleMessages>(`/locales/${locale}`)
  return data
}

export interface SearchResult {
  key: string
  tag: string
  route: string
  id: string | null
  title: string
}

export interface SearchResponse {
  results: SearchResult[]
}

/**
 * Search headings (h1–h6) by translated text. Backend resolves i18n keys to locale text.
 */
export async function searchHeadings(q: string, locale: string): Promise<SearchResult[]> {
  if (!q.trim()) return []
  const { data } = await apiClient.get<SearchResponse>('/search', {
    params: { q: q.trim(), locale }
  })
  return data.results ?? []
}
