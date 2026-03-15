<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'default' | 'success' | 'warning' | 'error'
    size?: 'sm' | 'md'
    rounded?: boolean
    class?: string
  }>(),
  {
    variant: 'default',
    size: 'md',
    rounded: true
  }
)

const variantClasses: Record<string, string> = {
  default:
    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
  success:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  warning:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
}

const sizeClasses: Record<string, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm'
}

const classes = computed(
  () =>
    `inline-flex items-center font-medium ${variantClasses[props.variant]} ${sizeClasses[props.size]} ${props.rounded ? 'rounded-full' : 'rounded'} ${props.class ?? ''}`
)
</script>

<template>
  <span :class="classes">
    <slot />
  </span>
</template>
