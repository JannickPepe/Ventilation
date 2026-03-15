<script setup lang="ts">
import AtomButton from '@/components/atoms/Button.vue'

withDefaults(
  defineProps<{
    tabs: { value: string; label: string }[]
    modelValue: string
    variant?: 'primary' | 'outline'
  }>(),
  {
    variant: 'primary'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function select(value: string) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div
    class="flex gap-1 border-b border-gray-200 dark:border-gray-700"
    role="tablist"
  >
    <AtomButton
      v-for="tab in tabs"
      :key="tab.value"
      :variant="modelValue === tab.value ? variant : 'ghost'"
      size="sm"
      shape="rounded"
      :class="
        'rounded-b-none border-b-2 -mb-px ' +
        (modelValue === tab.value
          ? 'border-violet-600 dark:border-violet-400'
          : 'border-transparent')
      "
      role="tab"
      :aria-selected="modelValue === tab.value"
      @click="select(tab.value)"
    >
      {{ tab.label }}
    </AtomButton>
  </div>
</template>
