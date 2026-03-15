<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    orientation?: 'horizontal' | 'vertical'
    spacing?: 'none' | 'sm' | 'md'
    class?: string
  }>(),
  {
    orientation: 'horizontal',
    spacing: 'md'
  }
)

const spacingClasses: Record<string, string> = {
  none: '',
  sm: 'my-2',
  md: 'my-4'
}

const classes = computed(() => {
  const base =
    props.orientation === 'horizontal'
      ? 'w-full border-t border-gray-200 dark:border-gray-700'
      : 'h-full border-l border-gray-200 dark:border-gray-700 self-stretch'
  return `${base} ${spacingClasses[props.spacing]} ${props.class ?? ''}`
})
</script>

<template>
  <hr
    v-if="orientation === 'horizontal'"
    :class="classes"
    role="separator"
  />
  <div
    v-else
    :class="classes"
    role="separator"
  />
</template>
