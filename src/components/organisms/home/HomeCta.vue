<script setup lang="ts">
import AtomTitle from '@/components/atoms/Title.vue'
import AtomButton from '@/components/atoms/Button.vue'
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
    <div
      class="rounded-2xl bg-gradient-to-r from-violet-600 to-violet-700 dark:from-violet-700 dark:to-violet-800 text-white p-12 md:p-16 text-center shadow-xl shadow-violet-500/20"
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
  </section>
</template>
