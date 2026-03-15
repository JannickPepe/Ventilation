import axios, { type AxiosInstance, type AxiosError } from 'axios'
import { handleError } from '@/core/errorHandler'

const baseURL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const apiClient: AxiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => config,
  (error) => {
    handleError(error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
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
