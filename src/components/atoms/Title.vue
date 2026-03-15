<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
    color?: 'default' | 'muted'
    tag?: string
    layout?: 'default' | 'minimal'
    class?: string
  }>(),
  {
    as: 'h2',
    size: 'md',
    color: 'default',
    tag: undefined,
    layout: 'default'
  }
)

const sizeClasses: Record<string, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl md:text-4xl'
}

const colorClasses: Record<string, string> = {
  default: 'text-gray-900 dark:text-gray-100',
  muted: 'text-gray-600 dark:text-gray-400'
}

const layoutClasses: Record<string, string> = {
  default: '',
  minimal: 'tracking-tight'
}

const classes = computed(
  () =>
    `${sizeClasses[props.size]} ${colorClasses[props.color]} font-medium ${layoutClasses[props.layout]} ${props.class ?? ''}`
)

const tag = computed(() => props.tag ?? props.as)
</script>

<template>
  <component
    :is="tag"
    :class="classes"
  >
    <slot />
  </component>
</template>
