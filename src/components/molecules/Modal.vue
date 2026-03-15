<script setup lang="ts">
import { watch } from 'vue'
import AtomButton from '@/components/atoms/Button.vue'
import AtomTitle from '@/components/atoms/Title.vue'
import AtomIcon from '@/components/atoms/Icon.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    size?: 'sm' | 'md' | 'lg'
    density?: 'default' | 'compact'
  }>(),
  {
    title: '',
    size: 'md',
    density: 'default'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}

function onBackdropClick(e: MouseEvent) {
  if ((e.target as HTMLElement)?.id === 'modal-backdrop') close()
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }
)

const sizeClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg'
}

</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      id="modal-backdrop"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click="onBackdropClick"
    >
      <div
        v-motion
        :initial="{ opacity: 0, scale: 0.95 }"
        :enter="{ opacity: 1, scale: 1 }"
        :leave="{ opacity: 0, scale: 0.95 }"
        transition="transition-all duration-200"
        :class="[
          'w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl',
          sizeClasses[size]
        ]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        @click.stop
      >
        <div
          :class="[
            'flex items-center justify-between border-b border-gray-200 dark:border-gray-700',
            density === 'compact' ? 'p-2' : 'p-4'
          ]"
        >
          <AtomTitle
            v-if="title"
            id="modal-title"
            as="h2"
            size="lg"
          >
            {{ title }}
          </AtomTitle>
          <span v-else />
          <AtomButton
            variant="ghost"
            size="sm"
            class="ml-auto -mr-2"
            aria-label="Close"
            @click="close"
          >
            <AtomIcon name="close" size="md" />
          </AtomButton>
        </div>
        <div :class="density === 'compact' ? 'p-2' : 'p-4'">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
