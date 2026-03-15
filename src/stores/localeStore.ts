import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { i18n, loadLocaleFromBackend } from '@/i18n'
import { defaultLocale } from '@/i18n'
import type { Locale } from '@/i18n'

export const useLocaleStore = defineStore(
  'locale',
  () => {
    const locale = ref<Locale>(defaultLocale)

    watch(
      locale,
      (val) => {
        i18n.global.locale.value = val
      },
      { immediate: true }
    )

    function setLocale(val: Locale) {
      locale.value = val
      loadLocaleFromBackend(val)
    }

    return { locale, setLocale }
  },
  { persist: true }
)
