<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const route = useRoute()
useHead({
  title: () => (route.meta.title as string) ?? 'VentPro – Expert Ventilation Services',
  meta: [
    {
      name: 'description',
      content: () =>
        (route.meta.description as string) ??
        'Expert ventilation services for your home and business. Installation, repair, inspection and maintenance. Certified technicians.'
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
  <RouterView />
</template>
