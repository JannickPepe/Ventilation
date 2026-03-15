<script setup lang="ts">
import { computed } from 'vue'
import AtomIcon from '@/components/atoms/Icon.vue'

const props = withDefaults(
  defineProps<{
    /** Single message (shown as one line). */
    message?: string
    /** Multiple messages (e.g. backend field errors). */
    messages?: string[]
    class?: string
  }>(),
  {
    message: '',
    messages: () => []
  }
)

const list = computed(() => {
  if (props.messages.length > 0) return props.messages
  if (props.message) return [props.message]
  return []
})

const visible = computed(() => list.value.length > 0)
</script>

<template>
  <div
    v-if="visible"
    role="alert"
    class="flex items-start gap-2 text-red-600 dark:text-red-400 text-sm mt-1"
    :class="props.class"
  >
    <AtomIcon name="circle-exclamation" size="sm" class="shrink-0 mt-0.5" />
    <ul class="list-none p-0 m-0">
      <li v-for="(msg, i) in list" :key="i">
        {{ msg }}
      </li>
    </ul>
  </div>
</template>
