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
    },
    {
      path: ROUTES.LOGIN.path,
      name: ROUTES.LOGIN.name,
      component: () => import('../views/LoginView.vue'),
      meta: {
        middleware: [],
        title: 'Login – VentPro',
        description: 'Sign in to your VentPro account. Access your dashboard and manage your ventilation services.',
        robots: 'noindex, nofollow'
      }
    },
    {
      path: ROUTES.REGISTER.path,
      name: ROUTES.REGISTER.name,
      component: () => import('../views/RegisterView.vue'),
      meta: {
        middleware: [],
        title: 'Register – VentPro',
        description: 'Create a VentPro account. Register for ventilation services and expert support.',
        robots: 'noindex, nofollow'
      }
    },
    {
      path: ROUTES.DASHBOARD.path,
      name: ROUTES.DASHBOARD.name,
      component: () => import('../views/DashboardView.vue'),
      meta: {
        middleware: ['auth'],
        title: 'Dashboard – VentPro',
        description: 'Your dashboard.',
        robots: 'noindex, nofollow'
      }
    }
  ]
})

registerRouterGuards(router)

export default router
