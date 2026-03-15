<script setup lang="ts">
import { ref } from 'vue'
import AtomLink from '@/components/atoms/Link.vue'
import AtomButton from '@/components/atoms/Button.vue'
import MoleculeSearch from '@/components/molecules/Search.vue'
import { ROUTES } from '@/constants'
import { useHeadingSearch } from '@/composables/useHeadingSearch'

const { query, results, loading, goToResult, clearResults } = useHeadingSearch()
const searchFocused = ref(false)
function onSearchBlur() {
  window.setTimeout(() => {
    searchFocused.value = false
    clearResults()
  }, 150)
}
</script>

<template>
  <header
    v-motion
    :initial="{ opacity: 0, y: -10 }"
    :enter="{ opacity: 1, y: 0 }"
    transition="transition-all duration-400 ease-out"
    class="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
    role="banner"
  >
    <div class="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
      <nav
        class="flex items-center gap-6"
        aria-label="Main navigation"
      >
        <AtomLink :to="ROUTES.HOME.path" class="font-semibold">
          {{ $t('home.header.logo') }}
        </AtomLink>
        <AtomLink :to="ROUTES.HOME.path" variant="muted" size="sm">
          {{ $t('home.header.services') }}
        </AtomLink>
        <AtomLink :to="ROUTES.HOME.path" variant="muted" size="sm">
          {{ $t('home.header.about') }}
        </AtomLink>
      </nav>
      <div class="flex items-center gap-4">
        <div
          class="hidden sm:block relative w-56"
          role="search"
          aria-label="Search page sections"
        >
          <div
            class="relative"
            @focusin="searchFocused = true"
            @focusout="onSearchBlur"
          >
            <MoleculeSearch
              v-model="query"
              :placeholder="$t('home.header.searchPlaceholder')"
              size="sm"
              :aria-label="$t('home.header.searchAriaLabel')"
            />
            <div
              v-if="searchFocused && (results.length > 0 || loading)"
              role="listbox"
              aria-label="Search results"
              class="absolute top-full left-0 right-0 mt-1 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-60 overflow-auto"
            >
              <div
                v-if="loading"
                class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
                role="status"
                aria-live="polite"
              >
                {{ $t('common.loading') }}
              </div>
              <button
                v-for="(r, index) in results"
                :key="r.key"
                type="button"
                role="option"
                :aria-selected="index === 0"
                class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                @click="goToResult(r)"
              >
                <span class="font-medium">{{ r.title }}</span>
              </button>
            </div>
          </div>
        </div>
        <AtomButton variant="primary" size="sm">
          {{ $t('home.header.contact') }}
        </AtomButton>
      </div>
    </div>
  </header>
</template>
