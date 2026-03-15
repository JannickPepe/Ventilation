<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'

const route = useRoute()
useHead({
  title: () => (route.meta.title as string) ?? 'Huso',
  meta: [
    {
      name: 'description',
      content: () => (route.meta.description as string) ?? 'Advanced Vue application'
    }
  ]
})
</script>

<template>
  <RouterView />
</template>
