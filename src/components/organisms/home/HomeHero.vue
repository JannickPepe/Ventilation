<script setup lang="ts">
import AtomTitle from '@/components/atoms/Title.vue'
import AtomButton from '@/components/atoms/Button.vue'
import AtomLink from '@/components/atoms/Link.vue'
import AtomBadge from '@/components/atoms/Badge.vue'
import { useLocaleStore } from '@/stores/localeStore'
import { supportedLocales } from '@/i18n'

const localeStore = useLocaleStore()
</script>

<template>
  <section
    id="hero"
    class="relative overflow-hidden container mx-auto px-4 py-20 md:py-32"
  >
    <div
      class="absolute inset-0 -z-10 bg-gradient-to-br from-violet-50 via-white to-cyan-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-violet-950/20"
      aria-hidden="true"
    />
    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0 }"
      transition="transition-all duration-700 ease-out"
      class="max-w-4xl"
    >
      <AtomBadge variant="default" size="sm" class="mb-4">
        {{ $t('home.hero.badge') }}
      </AtomBadge>
      <AtomTitle as="h1" size="3xl" class="mb-4">
        {{ $t('home.hero.title') }}
      </AtomTitle>
      <AtomTitle tag="p" size="lg" color="muted" class="mb-8">
        {{ $t('home.hero.subtitle') }}
      </AtomTitle>
      <div class="flex flex-wrap gap-4 items-center">
        <AtomButton variant="primary" size="lg">
          {{ $t('home.hero.cta') }}
        </AtomButton>
        <AtomLink :to="'#'" variant="muted">
          {{ $t('home.hero.secondary') }}
        </AtomLink>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ $t('common.language') }}:
        </span>
        <select
          :value="localeStore.locale"
          class="border rounded-lg px-3 py-1.5 bg-transparent dark:border-gray-600"
          @change="localeStore.setLocale(($event.target as HTMLSelectElement).value as 'en' | 'da')"
        >
          <option v-for="loc in supportedLocales" :key="loc" :value="loc">
            {{ loc === 'en' ? 'English' : 'Dansk' }}
          </option>
        </select>
      </div>
    </div>
  </section>
</template>
