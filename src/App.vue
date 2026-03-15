<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import MoleculeToastContainer from '@/components/molecules/ToastContainer.vue'

const route = useRoute()
useHead({
  title: () => (route.meta.title as string) ?? 'VentPro – Expert Ventilation Services',
  meta: [
    {
      name: 'description',
      content: () =>
        (route.meta.description as string) ??
        'Expert ventilation services for your home and business. Installation, repair, inspection and maintenance. Certified technicians.'
    },
    {
      name: 'robots',
      content: () => (route.meta.robots as string) ?? 'index, follow'
    }
  ]
})
</script>

<template>
  <a
    href="#main-content"
    class="skip-link"
  >
    Skip to main content
  </a>
  <div class="flex-1 flex flex-col min-h-0 min-w-0 w-full">
    <RouterView :key="route.fullPath" />
  </div>
  <MoleculeToastContainer />
</template>
