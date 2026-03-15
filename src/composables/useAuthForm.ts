import { ref, watch } from 'vue'
import type { ValidationErrors } from '@/types/auth'
import { getStoredAuthForm, setStoredAuthForm } from '@/utils/authFormStorage'

export function useAuthForm() {
  const email = ref('')
  const password = ref('')
  const errors = ref<ValidationErrors>({})

  const stored = getStoredAuthForm()
  if (stored.email) {
    email.value = stored.email
  }

  watch(
    email,
    (v) => {
      setStoredAuthForm({ email: v })
    },
    { flush: 'post' }
  )

  function setErrors(err: ValidationErrors | null): void {
    errors.value = err ?? {}
  }

  function clearErrors(): void {
    errors.value = {}
  }

  function getFieldError(field: string): string[] {
    return errors.value[field] ?? []
  }

  return {
    email,
    password,
    errors,
    setErrors,
    clearErrors,
    getFieldError
  }
}
