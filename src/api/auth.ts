import { apiClient } from '@/api/client'
import type { AuthResponse, LoginCredentials, RegisterPayload, ValidationErrors } from '@/types/auth'

/** Extract validation errors from an API error response (422). */
export function getValidationErrors(error: unknown): ValidationErrors | null {
  const data = (error as { response?: { data?: { errors?: ValidationErrors } } })?.response?.data
  const errors = data?.errors
  return errors && typeof errors === 'object' ? errors : null
}

export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials)
  return data
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/register', payload)
  return data
}

export async function refresh(refreshToken: string): Promise<AuthResponse> {
  const { data } = await apiClient.post<AuthResponse>('/auth/refresh', {
    refresh_token: refreshToken
  })
  return data
}
