<script setup lang="ts">
import AtomTitle from '@/components/atoms/Title.vue'
import AtomIcon from '@/components/atoms/Icon.vue'

withDefaults(
  defineProps<{
    title?: string
    description?: string
    icon?: string
    layout?: 'default' | 'minimal'
  }>(),
  {
    title: 'No results',
    description: '',
    icon: 'inbox',
    layout: 'default'
  }
)
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center text-center',
      layout === 'minimal' ? 'py-6 px-4' : 'py-12 px-6'
    ]"
  >
    <div
      :class="[
        'rounded-full flex items-center justify-center mb-4 text-gray-400 dark:text-gray-500',
        layout === 'minimal' ? 'w-12 h-12' : 'w-16 h-16 bg-gray-100 dark:bg-gray-800'
      ]"
    >
      <AtomIcon
        :name="icon"
        :size="layout === 'minimal' ? 'md' : 'lg'"
      />
    </div>
    <AtomTitle
      as="h3"
      :size="layout === 'minimal' ? 'md' : 'lg'"
      class="mb-2"
    >
      {{ title }}
    </AtomTitle>
    <AtomTitle
      v-if="description"
      tag="p"
      size="sm"
      color="muted"
      :class="layout === 'minimal' ? 'mb-3' : 'mb-6'"
    >
      {{ description }}
    </AtomTitle>
    <slot name="action" />
  </div>
</template>
