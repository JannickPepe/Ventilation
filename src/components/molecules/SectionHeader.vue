<script setup lang="ts">
import AtomTitle from '@/components/atoms/Title.vue'

withDefaults(
  defineProps<{
    title: string
    subtitle?: string
    align?: 'left' | 'center'
    layout?: 'default' | 'minimal'
    wrapperClass?: string
  }>(),
  {
    subtitle: '',
    align: 'left',
    layout: 'default',
    wrapperClass: ''
  }
)
</script>

<template>
  <div :class="['mb-8', align === 'center' ? 'text-center' : '', wrapperClass]">
    <AtomTitle
      as="h2"
      size="2xl"
      :class="(layout === 'minimal' ? 'mb-1' : 'mb-2') + (align === 'center' ? ' mx-auto' : '')"
    >
      {{ title }}
    </AtomTitle>
    <AtomTitle
      v-if="subtitle"
      tag="p"
      color="muted"
      :class="
        (layout === 'minimal' ? 'mb-4' : 'mb-0') +
        (align === 'center' ? ' max-w-2xl mx-auto' : '')
      "
    >
      {{ subtitle }}
    </AtomTitle>
  </div>
</template>
