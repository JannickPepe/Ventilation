<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import MoleculeSectionHeader from '@/components/molecules/SectionHeader.vue'
import { useFaqStore } from '@/stores/faqStore'

const faqStore = useFaqStore()
const { items, loading, error } = storeToRefs(faqStore)

const openId = ref<string | null>(null)
const toggle = (id: string) => {
  openId.value = openId.value === id ? null : id
}
const isOpen = (id: string) => openId.value === id

const hasItems = computed(() => items.value.length > 0)
</script>

<template>
  <section
    id="faq"
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :visible-once="{ opacity: 1, y: 0 }"
    transition="transition-all duration-600 ease-out"
    class="container mx-auto px-4 py-20"
  >
    <MoleculeSectionHeader
      :title="$t('home.faq.title')"
      :subtitle="$t('home.faq.subtitle')"
      align="center"
      wrapper-class="mb-12"
    />
    <div v-if="loading" class="text-center text-gray-500 dark:text-gray-400 py-8">
      {{ $t('common.loading') }}
    </div>
    <div v-else-if="error" class="text-center text-red-600 dark:text-red-400 py-8">
      {{ error }}
    </div>
    <div v-else-if="hasItems" class="max-w-2xl mx-auto space-y-2">
      <div
        v-for="item in items"
        :key="item.id"
        class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800/50"
      >
        <button
          type="button"
          class="w-full text-left px-5 py-4 flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          :aria-expanded="isOpen(item.id)"
          :aria-controls="`faq-answer-${item.id}`"
          :id="`faq-question-${item.id}`"
          @click="toggle(item.id)"
        >
          <span class="font-medium text-gray-900 dark:text-white pr-4">
            {{ item.question }}
          </span>
          <span
            class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-violet-600 dark:text-violet-400 transition-transform"
            :class="{ 'rotate-180': isOpen(item.id) }"
            aria-hidden="true"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
        <div
          :id="`faq-answer-${item.id}`"
          :aria-labelledby="`faq-question-${item.id}`"
          role="region"
          class="border-t border-gray-200 dark:border-gray-700"
          :class="isOpen(item.id) ? 'block' : 'hidden'"
        >
          <p class="px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
            {{ item.answer }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
