<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AtomButton from '@/components/atoms/Button.vue'
import AtomLink from '@/components/atoms/Link.vue'
import { ROUTES } from '@/constants'
import { useAuthStore } from '@/stores/authStore'
import { useToast } from '@/composables/useToast'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const toast = useToast()

function logout() {
  toast.success(t('auth.toast.loggedOut'))
  authStore.logout()
  router.push(ROUTES.LOGIN.path)
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-gray-900">
    <header class="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md" role="banner">
      <div class="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4">
        <h1 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ $t('auth.dashboard.title') }}
        </h1>
        <nav class="flex items-center gap-4" aria-label="Dashboard navigation">
          <AtomLink :to="ROUTES.HOME.path" variant="muted" size="sm">
            {{ $t('home.header.logo') }}
          </AtomLink>
          <AtomButton
            variant="outline"
            size="sm"
            aria-label="Log out of your account"
            @click="logout"
          >
            {{ $t('auth.dashboard.logout') }}
          </AtomButton>
        </nav>
      </div>
    </header>
    <main id="main-content" class="container mx-auto px-4 py-8" role="main">
      <p class="text-gray-600 dark:text-gray-400">
        {{ $t('auth.dashboard.welcome', { email: authStore.user?.email ?? '' }) }}
      </p>
    </main>
  </div>
</template>
