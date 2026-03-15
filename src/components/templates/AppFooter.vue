<script setup lang="ts">
import AtomLink from '@/components/atoms/Link.vue'
import { ROUTES } from '@/constants'
</script>

<template>
  <footer
    class="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
    role="contentinfo"
  >
    <div class="container mx-auto px-4 py-12">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            {{ $t('footer.logo') }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('footer.tagline') }}
          </p>
        </div>
        <nav aria-label="Footer navigation">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            {{ $t('footer.nav.title') }}
          </h3>
          <ul class="space-y-2">
            <li>
              <AtomLink :to="ROUTES.HOME.path" variant="muted" size="sm">
                {{ $t('home.header.services') }}
              </AtomLink>
            </li>
            <li>
              <AtomLink :to="ROUTES.HOME.path" variant="muted" size="sm">
                {{ $t('home.header.about') }}
              </AtomLink>
            </li>
            <li>
              <AtomLink :to="ROUTES.HOME.path" variant="muted" size="sm">
                {{ $t('home.header.contact') }}
              </AtomLink>
            </li>
          </ul>
        </nav>
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            {{ $t('footer.contact.title') }}
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ $t('footer.contact.text') }}
          </p>
        </div>
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            {{ $t('footer.legal.title') }}
          </h3>
          <ul class="space-y-2">
            <li>
              <AtomLink to="#" variant="muted" size="sm">
                {{ $t('footer.legal.privacy') }}
              </AtomLink>
            </li>
            <li>
              <AtomLink to="#" variant="muted" size="sm">
                {{ $t('footer.legal.terms') }}
              </AtomLink>
            </li>
          </ul>
        </div>
      </div>
      <div class="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
        {{ $t('footer.copyright') }}
      </div>
    </div>
  </footer>
</template>
