<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to: string
    external?: boolean
    variant?: 'default' | 'muted'
    size?: 'sm' | 'md' | 'lg'
    class?: string
  }>(),
  {
    external: false,
    variant: 'default',
    size: 'md'
  }
)

const baseClasses = 'transition-colors hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'

const variantClasses: Record<string, string> = {
  default: 'text-violet-600 hover:text-violet-700 dark:text-violet-400',
  muted: 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
}

const sizeClasses: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

const classes = computed(
  () =>
    `${baseClasses} ${variantClasses[props.variant]} ${sizeClasses[props.size]} ${props.class ?? ''}`
)
</script>

<template>
  <RouterLink
    v-if="!external"
    :to="to"
    :class="classes"
  >
    <slot />
  </RouterLink>
  <a
    v-else
    :href="to"
    :class="classes"
    target="_blank"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
</template>
