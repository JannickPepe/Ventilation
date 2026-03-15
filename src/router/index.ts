import { createRouter, createWebHistory } from 'vue-router'
import { ROUTES } from '@/constants'
import { registerRouterGuards } from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.HOME.path,
      name: ROUTES.HOME.name,
      component: () => import('../views/HomeView.vue'),
      meta: { middleware: [], title: 'Huso', description: 'Advanced Vue application' }
    }
  ]
})

registerRouterGuards(router)

export default router
