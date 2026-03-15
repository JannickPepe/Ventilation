import type { Middleware } from './types'

export const authMiddleware: Middleware = ({ next }) => {
  // Example: check auth store
  // const authStore = useAuthStore()
  // if (!authStore.isAuthenticated) next('/login')
  next()
}
