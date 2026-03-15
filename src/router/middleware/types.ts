import type { RouteLocationNormalized } from 'vue-router'

export type MiddlewareNext = (redirect?: string | false | void) => void

export type MiddlewareContext = {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: MiddlewareNext
}

export type Middleware = (ctx: MiddlewareContext) => void | Promise<void>
