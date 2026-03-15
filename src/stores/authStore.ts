import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import * as authApi from '@/api/auth'
import type { AuthUser, LoginCredentials, RegisterPayload } from '@/types/auth'
import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_USER_KEY,
  AUTH_EXPIRES_AT_KEY
} from '@/constants/authStorage'

function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_USER_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    return parsed?.id != null && typeof parsed?.email === 'string' ? parsed : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const user = ref<AuthUser | null>(null)
  const expiresAt = ref<number | null>(null)

  const isAuthenticated = computed(() => {
    const token = accessToken.value
    const exp = expiresAt.value
    return !!(token && exp != null && Date.now() < exp)
  })

  function setTokens(data: {
    access_token: string
    refresh_token: string
    expires_in: number
    user: AuthUser
  }): void {
    const at = data.access_token
    const rt = data.refresh_token
    const exp = Date.now() + data.expires_in * 1000
    accessToken.value = at
    refreshToken.value = rt
    user.value = data.user
    expiresAt.value = exp
    localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, at)
    localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, rt)
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user))
    localStorage.setItem(AUTH_EXPIRES_AT_KEY, String(exp))
  }

  function clearAuth(): void {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    expiresAt.value = null
    localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY)
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    localStorage.removeItem(AUTH_EXPIRES_AT_KEY)
  }

  function loadFromStorage(): void {
    const at = localStorage.getItem(AUTH_ACCESS_TOKEN_KEY)
    const rt = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY)
    const expRaw = localStorage.getItem(AUTH_EXPIRES_AT_KEY)
    const exp = expRaw != null ? Number(expRaw) : null
    if (at && rt && exp != null && Date.now() < exp) {
      accessToken.value = at
      refreshToken.value = rt
      user.value = getStoredUser()
      expiresAt.value = exp
    } else {
      clearAuth()
    }
  }

  async function login(credentials: LoginCredentials): Promise<void> {
    const data = await authApi.login(credentials)
    setTokens(data)
  }

  async function register(payload: RegisterPayload): Promise<void> {
    const data = await authApi.register(payload)
    setTokens(data)
  }

  function logout(): void {
    clearAuth()
  }

  return {
    accessToken,
    refreshToken,
    user,
    expiresAt,
    isAuthenticated,
    setTokens,
    clearAuth,
    loadFromStorage,
    login,
    register,
    logout
  }
})
