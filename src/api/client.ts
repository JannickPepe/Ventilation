import axios, { type AxiosInstance, type AxiosError } from 'axios'
import { handleError } from '@/core/errorHandler'
import { ROUTES } from '@/constants'
import {
  AUTH_ACCESS_TOKEN_KEY,
  AUTH_REFRESH_TOKEN_KEY,
  AUTH_USER_KEY,
  AUTH_EXPIRES_AT_KEY
} from '@/constants/authStorage'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

function clearAuthStorage(): void {
  try {
    localStorage.removeItem(AUTH_ACCESS_TOKEN_KEY)
    localStorage.removeItem(AUTH_REFRESH_TOKEN_KEY)
    localStorage.removeItem(AUTH_USER_KEY)
    localStorage.removeItem(AUTH_EXPIRES_AT_KEY)
  } catch {
    // ignore
  }
}

function redirectToLogin(): void {
  window.location.href = ROUTES.LOGIN.path
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(AUTH_ACCESS_TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    handleError(error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config
    const status = error.response?.status
    const isRefreshRequest = (config as { _skipAuthRefresh?: boolean })?._skipAuthRefresh

    if (status === 401 && config && !isRefreshRequest) {
      const refreshToken = localStorage.getItem(AUTH_REFRESH_TOKEN_KEY)
      if (!refreshToken) {
        clearAuthStorage()
        redirectToLogin()
        return Promise.reject(error)
      }
      try {
        const { data } = await apiClient.post<{
          user: { id: number; email: string }
          access_token: string
          refresh_token: string
          expires_in: number
        }>('/auth/refresh', { refresh_token: refreshToken }, { _skipAuthRefresh: true } as object)
        const expiresAt = Date.now() + data.expires_in * 1000
        localStorage.setItem(AUTH_ACCESS_TOKEN_KEY, data.access_token)
        localStorage.setItem(AUTH_REFRESH_TOKEN_KEY, data.refresh_token)
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user))
        localStorage.setItem(AUTH_EXPIRES_AT_KEY, String(expiresAt))
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${data.access_token}`
        return apiClient.request(config)
      } catch {
        clearAuthStorage()
        redirectToLogin()
        return Promise.reject(error)
      }
    }

    if (isRefreshRequest && status === 401) {
      clearAuthStorage()
      redirectToLogin()
      return Promise.reject(error)
    }

    const appError = {
      message: (error.response?.data as { message?: string })?.message ?? error.message,
      status: error.response?.status,
      code: error.code,
      details: error
    }
    handleError(appError)
    return Promise.reject(error)
  }
)
