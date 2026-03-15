<script setup lang="ts">
import AtomTitle from '@/components/atoms/Title.vue'
import AtomButton from '@/components/atoms/Button.vue'

import ctaImage from '@/assets/images/ventilation-two.png'
</script>

<template>
  <section
    id="cta"
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :visible-once="{ opacity: 1, y: 0 }"
    transition="transition-all duration-600 ease-out"
    class="container mx-auto px-4 py-20"
  >
    <div class="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-10">
      <div class="flex-shrink-0 w-full lg:w-1/2 rounded-xl overflow-hidden shadow-lg">
        <img
          :src="ctaImage"
          :alt="$t('home.cta.ctaImgAlt')"
          class="w-full h-full min-h-[280px] object-cover object-top"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        >
      </div>
      <div
        class="flex-1 rounded-2xl bg-gradient-to-r from-violet-600 to-violet-700 dark:from-violet-700 dark:to-violet-800 text-white p-12 md:p-16 text-center shadow-xl shadow-violet-500/20 flex flex-col justify-center"
      >
        <AtomTitle as="h2" size="2xl" class="mb-4 !text-white">
          {{ $t('home.cta.title') }}
        </AtomTitle>
        <AtomTitle tag="p" size="lg" class="mb-8 opacity-90">
          {{ $t('home.cta.subtitle') }}
        </AtomTitle>
        <AtomButton
          variant="secondary"
          size="lg"
          class="!bg-white !text-violet-600 hover:!bg-gray-100"
        >
          {{ $t('home.cta.button') }}
        </AtomButton>
      </div>
    </div>
  </section>
</template>
