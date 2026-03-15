import { describe, it, expect } from 'vitest'
import { defaultLocale, supportedLocales, type Locale } from '@/i18n'

describe('i18n config', () => {
  it('default locale is English', () => {
    expect(defaultLocale).toBe('en')
  })

  it('supported locales include en and da', () => {
    expect(supportedLocales).toContain('en')
    expect(supportedLocales).toContain('da')
    expect(supportedLocales).toHaveLength(2)
  })

  it('Locale type is en | da', () => {
    const locales: Locale[] = supportedLocales
    expect(locales).toEqual(['en', 'da'])
  })
})
