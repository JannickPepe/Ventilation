<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import AtomIcon from '@/components/atoms/Icon.vue'
import type { ToastItem, ToastVariant } from '@/types/toast'

const props = defineProps<{
  toast: ToastItem
}>()

const emit = defineEmits<{
  close: []
}>()

const progressPercent = ref(100)
let timerId: ReturnType<typeof setTimeout> | null = null
let startTime = 0

const variantIcon = computed((): string => {
  const map: Record<ToastVariant, string> = {
    success: 'check',
    warning: 'triangle-exclamation',
    error: 'circle-exclamation'
  }
  return map[props.toast.variant]
})

const variantClasses = computed(() => {
  const base = 'border-l-4 '
  const map: Record<ToastVariant, string> = {
    success: 'bg-green-50 dark:bg-green-900/20 border-green-500 text-green-800 dark:text-green-200',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-500 text-amber-800 dark:text-amber-200',
    error: 'bg-red-50 dark:bg-red-900/20 border-red-500 text-red-800 dark:text-red-200'
  }
  return base + map[props.toast.variant]
})

function close() {
  emit('close')
}

function startProgress() {
  if (!props.toast.autoClose || !props.toast.showProgress) return
  startTime = Date.now()
  const delay = props.toast.autoCloseDelay

  const tick = () => {
    const elapsed = Date.now() - startTime
    progressPercent.value = Math.max(0, 100 - (elapsed / delay) * 100)
    if (elapsed < delay) {
      timerId = setTimeout(tick, 50)
    }
  }
  tick()
}

function startAutoClose() {
  if (!props.toast.autoClose) return
  setTimeout(() => {
    close()
  }, props.toast.autoCloseDelay)
}

onMounted(() => {
  startProgress()
  startAutoClose()
})

onUnmounted(() => {
  if (timerId) clearTimeout(timerId)
})
</script>

<template>
  <div
    role="alert"
    :class="variantClasses"
    class="rounded-lg shadow-lg p-4 pr-10 min-w-[280px] max-w-md relative overflow-hidden"
  >
    <div class="flex items-start gap-3">
      <AtomIcon :name="variantIcon" size="md" class="shrink-0 mt-0.5" />
      <p class="text-sm font-medium flex-1">{{ toast.message }}</p>
      <button
        type="button"
        class="absolute top-3 right-3 p-1 rounded hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1"
        aria-label="Close"
        @click="close"
      >
        <AtomIcon name="close" size="sm" />
      </button>
    </div>
    <div
      v-if="toast.autoClose && toast.showProgress"
      class="absolute bottom-0 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 flex justify-end"
      aria-hidden="true"
    >
      <div
        class="h-full transition-all duration-75 ease-linear bg-current opacity-30"
        :style="{ width: `${progressPercent}%` }"
      />
    </div>
  </div>
</template>
