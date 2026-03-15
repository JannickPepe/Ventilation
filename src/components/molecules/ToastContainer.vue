<script setup lang="ts">
import { storeToRefs } from 'pinia'
import AtomToastMessage from '@/components/atoms/ToastMessage.vue'
import { useToastStore } from '@/stores/toastStore'

const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)

function dismiss(id: string) {
  toastStore.dismiss(id)
}
</script>

<template>
  <div
    class="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 max-w-full pointer-events-none"
    aria-live="polite"
    aria-label="Notifications"
  >
    <div v-for="toast in toasts" :key="toast.id" class="pointer-events-auto">
      <AtomToastMessage :toast="toast" @close="dismiss(toast.id)" />
    </div>
  </div>
</template>
