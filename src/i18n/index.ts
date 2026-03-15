import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json'
import da from '@/locales/da.json'
import { fetchLocale } from '@/api/locales'

export type Locale = 'en' | 'da'

export const defaultLocale: Locale = 'en'

export const supportedLocales: Locale[] = ['en', 'da']

const bundledMessages: Record<Locale, Record<string, unknown>> = { en, da }

export const i18n = createI18n<false>({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: defaultLocale,
  messages: { en, da }
})

/**
 * Load locale messages from backend (source of truth) and merge into i18n.
 * On failure (e.g. backend down), leaves existing bundled messages as-is.
 */
export async function loadLocaleFromBackend(locale: Locale): Promise<boolean> {
  try {
    const messages = await fetchLocale(locale)
    if (messages && typeof messages === 'object') {
      i18n.global.setLocaleMessage(locale, messages)
      return true
    }
  } catch {
    // Backend unavailable: keep bundled messages
  }
  return false
}

/**
 * Get bundled messages for a locale (fallback when backend is not used).
 */
export function getBundledMessages(locale: Locale): Record<string, unknown> {
  return bundledMessages[locale] ?? bundledMessages[defaultLocale]
}
