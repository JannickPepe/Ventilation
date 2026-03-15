<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import HomeHeader from '@/components/organisms/home/HomeHeader.vue'
import AppFooter from '@/components/templates/AppFooter.vue'
import AtomInput from '@/components/atoms/Input.vue'
import AtomButton from '@/components/atoms/Button.vue'
import AtomLink from '@/components/atoms/Link.vue'
import AtomErrorMessage from '@/components/atoms/ErrorMessage.vue'
import AtomIcon from '@/components/atoms/Icon.vue'
import { ROUTES } from '@/constants'
import { AUTH_STEPS_REGISTER } from '@/constants'
import { useAuthStore } from '@/stores/authStore'
import { useAuthForm } from '@/composables/useAuthForm'
import { useStepProgress } from '@/composables/useStepProgress'
import { useToast } from '@/composables/useToast'
import { getValidationErrors } from '@/api/auth'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()
const toast = useToast()
const { email, password, setErrors, clearErrors, getFieldError } = useAuthForm()
const { currentStep, progress, next, reset } = useStepProgress([...AUTH_STEPS_REGISTER])
const loading = ref(false)

const emailError = computed(() => getFieldError('email'))
const passwordError = computed(() => getFieldError('password'))
const formError = computed(() => getFieldError('form'))

async function onSubmit() {
  clearErrors()
  reset()
  next()
  loading.value = true
  try {
    next()
    await authStore.register({ email: email.value, password: password.value })
    next()
    toast.success(t('auth.toast.registerSuccess'))
    await router.push(ROUTES.DASHBOARD.path)
  } catch (err) {
    const errors = getValidationErrors(err)
    if (errors) setErrors(errors)
    else setErrors({ form: [(err as Error)?.message ?? 'Something went wrong'] })
    toast.error(t('auth.toast.registerFailed'))
    reset()
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
    <HomeHeader />
    <main id="main-content" class="flex flex-col items-center justify-center flex-1 py-12 px-4" role="main">
      <div class="w-full max-w-sm space-y-6">
        <h1 class="text-2xl font-semibold text-center">
          {{ $t('auth.register.title') || 'Register' }}
        </h1>

        <form
        class="space-y-4"
        @submit.prevent="onSubmit"
      >
        <AtomErrorMessage v-if="formError.length" :messages="formError" class="mb-2" />
        <div>
          <label for="register-email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('auth.fields.email') }}
          </label>
          <AtomInput
            id="register-email"
            v-model="email"
            type="email"
            :placeholder="$t('auth.fields.emailPlaceholder')"
            :error="emailError.length > 0"
            aria-label="Email"
          />
          <AtomErrorMessage :messages="emailError" />
        </div>
        <div>
          <label for="register-password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {{ $t('auth.fields.password') }}
          </label>
          <AtomInput
            id="register-password"
            v-model="password"
            type="password"
            :placeholder="$t('auth.fields.passwordPlaceholder')"
            :error="passwordError.length > 0"
            aria-label="Password"
          />
          <AtomErrorMessage :messages="passwordError" />
        </div>

        <div v-if="loading" class="flex flex-col items-center gap-2 py-2">
          <AtomIcon name="spinner" class="animate-spin" size="lg" />
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ currentStep }}</p>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              class="bg-violet-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
        <AtomButton
          v-else
          type="submit"
          variant="primary"
          class="w-full"
          aria-label="Create account"
        >
          {{ $t('auth.register.submit') }}
        </AtomButton>
      </form>

      <p class="text-center text-sm text-gray-600 dark:text-gray-400">
        {{ $t('auth.register.hasAccount') }}
        <AtomLink :to="ROUTES.LOGIN.path" variant="default" size="sm">
          {{ $t('auth.login.title') }}
        </AtomLink>
      </p>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
