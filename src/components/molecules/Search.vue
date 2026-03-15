<script setup lang="ts">
import AtomInput from '@/components/atoms/Input.vue'
import AtomIcon from '@/components/atoms/Icon.vue'

withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    modelValue: '',
    placeholder: 'Search...',
    size: 'md'
  }
)
defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div class="relative">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <AtomIcon name="search" :size="size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md'" />
    </span>
    <AtomInput
      :model-value="modelValue"
      :placeholder="placeholder"
      :size="size"
      class="pl-10"
      @update:model-value="$emit('update:modelValue', $event)"
    />
  </div>
</template>
