<script setup lang="ts">
import AtomTitle from '@/components/atoms/Title.vue'
import AtomIcon from '@/components/atoms/Icon.vue'
import MoleculeSectionHeader from '@/components/molecules/SectionHeader.vue'

const benefits = [
  { key: 'certified', icon: 'shield' },
  { key: 'fast', icon: 'clock' },
  { key: 'warranty', icon: 'check' },
  { key: 'expert', icon: 'gear' }
]
</script>

<template>
  <section
    id="benefits"
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :visible-once="{ opacity: 1, y: 0 }"
    transition="transition-all duration-600 ease-out"
    class="container mx-auto px-4 py-20 bg-gradient-to-b from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl my-20"
  >
    <MoleculeSectionHeader
      :title="$t('home.benefits.title')"
      :subtitle="$t('home.benefits.subtitle')"
      align="center"
      wrapper-class="mb-12"
    />
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div
        :id="`benefit-${ben.key}`"
        v-for="ben in benefits"
        :key="ben.key"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible-once="{ opacity: 1, y: 0 }"
        transition="transition-all duration-500 ease-out"
        class="flex flex-col items-center text-center"
      >
        <div
          class="w-14 h-14 rounded-full bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-4 text-violet-600 dark:text-violet-400"
        >
          <AtomIcon :name="ben.icon" size="lg" />
        </div>
        <AtomTitle as="h3" size="lg" class="mb-1">
          {{ $t(`home.benefits.items.${ben.key}.title`) }}
        </AtomTitle>
        <AtomTitle tag="p" size="sm" color="muted">
          {{ $t(`home.benefits.items.${ben.key}.desc`) }}
        </AtomTitle>
      </div>
    </div>
  </section>
</template>
