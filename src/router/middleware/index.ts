import type { Middleware } from './types'
import { authMiddleware } from './auth'

export const middleware = {
  auth: authMiddleware
} satisfies Record<string, Middleware>

export type { Middleware, MiddlewareContext } from './types'
