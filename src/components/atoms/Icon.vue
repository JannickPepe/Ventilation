<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { computed } from 'vue'
import { getIcon } from '@/utils/icon'
import type { IconName } from '@/utils/icon'

const props = withDefaults(
  defineProps<{
    name: IconName | string
    size?: 'sm' | 'md' | 'lg'
    ariaHidden?: boolean
    class?: string
  }>(),
  {
    size: 'md',
    ariaHidden: true
  }
)

const sizeClasses: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

const iconDef = computed(() => getIcon(props.name))
</script>

<template>
  <FontAwesomeIcon
    :icon="iconDef"
    :class="[sizeClasses[size], props.class ?? '']"
    :aria-hidden="ariaHidden"
  />
</template>
