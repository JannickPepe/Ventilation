<script setup lang="ts">
import AtomTitle from '@/components/atoms/Title.vue'
import MoleculeSectionHeader from '@/components/molecules/SectionHeader.vue'

import imgCover from '@/assets/images/ventilation-cover.png'
import imgSystemScience from '@/assets/images/ventilation-five.png'
</script>

<template>
  <section
    id="ventilation-concepts"
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :visible-once="{ opacity: 1, y: 0 }"
    transition="transition-all duration-600 ease-out"
    class="container mx-auto px-4 py-20"
  >
    <MoleculeSectionHeader
      :title="$t('home.ventilationConcepts.title')"
      :subtitle="$t('home.ventilationConcepts.subtitle')"
      align="center"
      wrapper-class="mb-12"
    />
    <div class="grid gap-10 lg:grid-cols-2 lg:gap-12">
      <div
        class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm"
      >
        <img
          :src="imgCover"
          :alt="$t('home.cta.coverImgAlt')"
          class="w-full h-auto"
          loading="lazy"
          decoding="async"
        >
        <div class="p-6">
          <AtomTitle as="h3" size="lg" class="mb-2">
            {{ $t('home.ventilationConcepts.airExchangeTitle') }}
          </AtomTitle>
          <AtomTitle tag="p" size="sm" color="muted">
            {{ $t('home.ventilationConcepts.airExchangeDesc') }}
          </AtomTitle>
        </div>
      </div>
      <div
        class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800/50 shadow-sm"
      >
        <img
          :src="imgSystemScience"
          :alt="$t('home.ventilationConcepts.systemScienceImgAlt')"
          class="w-full h-auto"
          loading="lazy"
          decoding="async"
        >
        <div class="p-6">
          <AtomTitle as="h3" size="lg" class="mb-2">
            {{ $t('home.ventilationConcepts.systemScienceTitle') }}
          </AtomTitle>
          <AtomTitle tag="p" size="sm" color="muted">
            {{ $t('home.ventilationConcepts.systemScienceDesc') }}
          </AtomTitle>
        </div>
      </div>
    </div>
  </section>
</template>
