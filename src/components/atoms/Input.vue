<script setup lang="ts">
import { computed } from 'vue'

const model = defineModel<string>({ default: '' })

const props = withDefaults(
  defineProps<{
    type?: string
    placeholder?: string
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    error?: boolean
    class?: string
  }>(),
  {
    type: 'text',
    placeholder: '',
    disabled: false,
    size: 'md',
    error: false
  }
)

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg'
}

const classes = computed(
  () =>
    `w-full border bg-white dark:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[props.size]} ${props.error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} ${props.class ?? ''}`
)
</script>

<template>
  <input
    v-model="model"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="classes"
  />
</template>
