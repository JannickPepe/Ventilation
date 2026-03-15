import { apiClient } from '@/api/client'

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface FaqResponse {
  items: FaqItem[]
}

/**
 * Fetch FAQ items from the backend for the given locale.
 */
export async function fetchFaqFromApi(locale: string): Promise<FaqItem[]> {
  const { data } = await apiClient.get<FaqResponse>('/faq', {
    params: { locale }
  })
  return data.items ?? []
}
