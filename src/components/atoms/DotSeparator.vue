<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    count?: number
    size?: 'sm' | 'md'
    class?: string
  }>(),
  { count: 3, size: 'md' }
)

const sizeClasses: Record<string, string> = {
  sm: 'w-1 h-1',
  md: 'w-1.5 h-1.5'
}
</script>

<template>
  <span
    class="inline-flex items-center gap-1 text-gray-400"
    role="separator"
  >
    <span
      v-for="i in props.count"
      :key="i"
      :class="[sizeClasses[props.size], 'rounded-full bg-current']"
    />
  </span>
</template>
