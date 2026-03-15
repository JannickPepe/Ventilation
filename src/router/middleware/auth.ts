import { useAuthStore } from '@/stores/authStore'
import { ROUTES } from '@/constants'
import type { Middleware } from './types'

export const authMiddleware: Middleware = ({ next }) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    next(ROUTES.LOGIN.path)
    return
  }
  next()
}
