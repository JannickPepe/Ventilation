<script setup lang="ts">
import { computed } from 'vue'
import AtomBadge from '@/components/atoms/Badge.vue'
import AtomButton from '@/components/atoms/Button.vue'

const props = withDefaults(
  defineProps<{
    options: { value: string; label: string }[]
    modelValue?: string[]
    variant?: 'badge' | 'button'
  }>(),
  {
    modelValue: () => [],
    variant: 'badge'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const selected = computed({
  get: () => props.modelValue ?? [],
  set: (v: string[]) => emit('update:modelValue', v)
})

function toggle(value: string) {
  const idx = selected.value.indexOf(value)
  if (idx >= 0) {
    selected.value = selected.value.filter((_, i) => i !== idx)
  } else {
    selected.value = [...selected.value, value]
  }
}

function isActive(value: string) {
  return selected.value.includes(value)
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <template v-if="variant === 'badge'">
      <AtomBadge
        v-for="opt in options"
      :key="opt.value"
      :variant="isActive(opt.value) ? 'default' : 'default'"
      :class="
        'cursor-pointer select-none transition-opacity ' +
        (isActive(opt.value) ? 'ring-2 ring-violet-500' : 'opacity-75 hover:opacity-100')
      "
      @click="toggle(opt.value)"
    >
      {{ opt.label }}
    </AtomBadge>
    </template>
    <template v-else>
      <AtomButton
        v-for="opt in options"
      :key="opt.value"
      :variant="isActive(opt.value) ? 'primary' : 'outline'"
      size="sm"
      @click="toggle(opt.value)"
    >
      {{ opt.label }}
    </AtomButton>
    </template>
  </div>
</template>
