import type { Router } from 'vue-router'
import { middleware } from './middleware'

type NextFn = (to?: string | false | void) => void

export function registerRouterGuards(router: Router): void {
  router.beforeEach(async (to, from, next: NextFn) => {
    const middlewareNames = (to.meta.middleware as string[]) ?? []
    let idx = 0

    const runNext = (override?: string | false | void): void => {
      if (override !== undefined && override !== null) {
        next(override)
        return
      }
      if (idx >= middlewareNames.length) {
        next()
        return
      }
      const name = middlewareNames[idx++]
      const fn = middleware[name as keyof typeof middleware]
      if (!fn) {
        runNext()
        return
      }
      fn({ to, from, next: runNext })
    }

    runNext()
  })
}
