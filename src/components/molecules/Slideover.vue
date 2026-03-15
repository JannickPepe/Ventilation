<script setup lang="ts">
import { watch } from 'vue'
import AtomButton from '@/components/atoms/Button.vue'
import AtomTitle from '@/components/atoms/Title.vue'
import AtomIcon from '@/components/atoms/Icon.vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    position?: 'right' | 'left'
    density?: 'default' | 'compact'
  }>(),
  {
    title: '',
    position: 'right',
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
  if ((e.target as HTMLElement)?.id === 'slideover-backdrop') close()
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
  }
)

const slideInitial = () =>
  props.position === 'right' ? { x: 100, opacity: 0 } : { x: -100, opacity: 0 }
const slideEnter = () => (props.position === 'right' ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 })
const slideLeave = () =>
  props.position === 'right' ? { x: 100, opacity: 0 } : { x: -100, opacity: 0 }
const panelClasses = () =>
  props.position === 'right'
    ? 'right-0 top-0 bottom-0'
    : 'left-0 top-0 bottom-0'
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      id="slideover-backdrop"
      class="fixed inset-0 z-50 flex"
      @click="onBackdropClick"
    >
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :enter="{ opacity: 1 }"
        :leave="{ opacity: 0 }"
        class="absolute inset-0 bg-black/50"
      />
      <div
        v-motion
        :initial="slideInitial()"
        :enter="slideEnter()"
        :leave="slideLeave()"
        transition="transition-all duration-300 ease-out"
        :class="[
          'absolute w-full max-w-sm bg-white dark:bg-gray-900 shadow-xl',
          panelClasses()
        ]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="slideover-title"
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
            id="slideover-title"
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
        <div
          :class="[
            'overflow-y-auto max-h-[calc(100vh-80px)]',
            density === 'compact' ? 'p-2' : 'p-4'
          ]"
        >
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>
