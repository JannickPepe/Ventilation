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
      meta: {
        middleware: [],
        title: 'VentPro – Expert Ventilation Services',
        description: 'Expert ventilation services for your home and business. Installation, repair, inspection and maintenance. Certified technicians.'
      }
    }
  ]
})

registerRouterGuards(router)

export default router
