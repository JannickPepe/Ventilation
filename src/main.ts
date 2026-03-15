import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createHead } from '@vueuse/head'
import { MotionPlugin } from '@vueuse/motion'
import { i18n, loadLocaleFromBackend, supportedLocales } from '@/i18n'
import App from './App.vue'
import router from './router'
import './style.css'

const pinia = createPinia()
const head = createHead()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(head)
app.use(i18n)
app.use(router)
app.use(MotionPlugin)

// Load locales from backend (source of truth) before first paint. Falls back to bundled if backend is down.
const BACKEND_LOAD_MS = 3000
const loadBackendLocales = () =>
  Promise.race([
    Promise.all(supportedLocales.map((locale) => loadLocaleFromBackend(locale))),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), BACKEND_LOAD_MS)
    )
  ]).catch(() => {})

loadBackendLocales().finally(() => {
  app.mount('#app')
})
