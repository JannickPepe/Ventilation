<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    shape?: 'rounded' | 'pill'
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    class?: string
  }>(),
  {
    variant: 'primary',
    size: 'md',
    shape: 'rounded',
    disabled: false,
    type: 'button'
  }
)

const variantClasses: Record<string, string> = {
  primary:
    'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500 dark:bg-violet-500 dark:hover:bg-violet-600',
  secondary:
    'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
  outline:
    'border-2 border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800',
  ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800'
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

const shapeClasses: Record<string, string> = {
  rounded: 'rounded-lg',
  pill: 'rounded-full'
}

const classes = computed(
  () =>
    `inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[props.variant]} ${sizeClasses[props.size]} ${shapeClasses[props.shape]} ${props.class ?? ''}`
)
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
