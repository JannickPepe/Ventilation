import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore(
  'app',
  () => {
    const theme = ref<'light' | 'dark'>('light')
    const sidebarOpen = ref(true)

    function setTheme(value: 'light' | 'dark') {
      theme.value = value
    }

    function toggleSidebar() {
      sidebarOpen.value = !sidebarOpen.value
    }

    return { theme, sidebarOpen, setTheme, toggleSidebar }
  },
  { persist: true }
)
